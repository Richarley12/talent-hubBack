import { PrismaService } from "src/config/prisma/prisma.service";
import { AccountUserRepository } from "../../domain/repositories/accountUser.repository";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AccountUserEntity } from "../../domain/entities/account.entity";

@Injectable()
export class PrismaAccountUser implements AccountUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(user: AccountUserEntity, hashedPassword: string): Promise<AccountUserEntity> {
        try {
            const existing = await this.prisma.accountUser.findUnique({
                where: { email: user.email.toLowerCase() },
            });

            if (existing) {
                throw new HttpException(`EL correo ${user.email} ya existe`, HttpStatus.CONFLICT);
            }

            const accountUser = await this.prisma.accountUser.create({
                data: {
                    id: crypto.randomUUID(),
                    email: user.email.toLowerCase(),
                    state: true,
                    companyId: user.companyId,
                    credential: {
                        create: {
                            password: hashedPassword,
                        },
                    },
                },
            });

            return new AccountUserEntity(
                accountUser.id,
                accountUser.email,
                accountUser.resetKey,
                accountUser.state,
                accountUser.companyId,
                accountUser.employeeId?.toString() ?? undefined, // por si llega como number | null
            );

        } catch (error) {
            throw new HttpException(error.message, error.status
            )
        }

    }

    async findByEmail(email: string): Promise<(AccountUserEntity & { password: string; }) | null> {
        const existing = await this.prisma.accountUser.findUnique({
            where: { email: email.toLowerCase() },
            include:{credential: true,}
        });
        if (!existing || !existing.credential) return null;

        return {
          ...new AccountUserEntity(
            existing.id,
            existing.email,
            existing.resetKey,
            existing.state,
            existing.companyId,
            existing.employeeId?.toString(),
          ),
          password: existing.credential.password, // ✅ combinamos con el password
        };
    }

}