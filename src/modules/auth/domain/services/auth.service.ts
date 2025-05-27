import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RegisterCompanyDto } from '../../application/dto/registerCompany.dto';
import { CryptoService } from '../interfaces/crypto.service';
import { RequestLoginDto } from '../../application/dto/requestLogin.dto';
import { CompanyEntity } from 'src/modules/company/domain/entities/company.entity';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { AccountUserRepository } from 'src/modules/account/domain/repositories/accountUser.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService,
    @Inject('CompanyRepository')
    private companyRepository: CompanyRepository,
    @Inject('AccountUserRepository')
    private accountUserRepository: AccountUserRepository,
    private cryptoService: CryptoService,
  ) { }

  generateToken(): string {
    const payload = {
      data: envs.jwt_secret,
      key: envs.key_crypto,
      iv: envs.iv_crypto,
    };
    return this.jwtService.sign(payload);

  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async registerCompany(dto: RegisterCompanyDto) {

    try {
      const hashedPassword = await this.cryptoService.encrypt(envs.key_crypto, envs.iv_crypto, dto.password);

      const[existingCompany,existingAccountUser]= await Promise.all([
        this.companyRepository.findByNit(dto.nit),
        this.accountUserRepository.findByEmail(dto.email)
      ])
      if (existingCompany) throw new HttpException('Ya existe una empresa con este NIT', HttpStatus.CONFLICT);
      if (existingAccountUser)  throw new HttpException(`EL correo ${dto.email} ya existe`, HttpStatus.CONFLICT);


      const companyEntity = new CompanyEntity(
        crypto.randomUUID(),
        dto.nit,
        dto.comercialName,
        dto.address,
        dto.description ?? '',
        dto.cellPhoneNumber,
        new Date(),
        false,
      );

      const company = await this.companyRepository.create(companyEntity);

      await this.accountUserRepository.create({
        id: crypto.randomUUID(),
        email: dto.email,
        resetKey: null,
        state: true,
        companyId: company.id,
      }, hashedPassword);

      return { message: 'Empresa registrada exitosamente' };

    } catch (error) {
      console.log(error)
      throw new HttpException(error.response, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async login(dto: RequestLoginDto) {
    const user = await this.accountUserRepository.findByEmail(dto.email)

    if (!user)  throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);

    const passwordDecrypted = await this.cryptoService.decrypt(
      user.password,
    );

    //const valid = await bcrypt.compare(dto.password, user.credential.password);

    if (dto.password != passwordDecrypted) {
      throw new HttpException('Contraseña inválida', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({
      sub: user.id,
      companyId: user.companyId,
      email: user.email,
    });

    return { accessToken: token };
  }



}
