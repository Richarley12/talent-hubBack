import { CompanyRepository } from '../../domain/repositories/company.repository';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: CompanyEntity): Promise<CompanyEntity> {
    try {

        const existing = await this.prisma.company.findUnique({
            where: { nit: entity.nit },
          });
        
          if (existing) {
            throw new HttpException('Ya existe una empresa con este NIT', HttpStatus.CONFLICT);
          }

      const created = await this.prisma.company.create({
        data: {
          id: entity.id,
          nit: entity.nit,
          commercialName: entity.commercialName.toLowerCase(),
          address: entity.address.toLowerCase(),
          description: entity.description,
          cellPhoneNumber: entity.cellPhoneNumber,
        },
      });
      return new CompanyEntity(
        created.id,
        created.nit,
        created.commercialName,
        created.address?? '',
        created.description,
        created.cellPhoneNumber?? '',
        created.dateCreation,
        created.eliminated,
      );    
    } catch (error: any) {
      throw new HttpException(error.message,error.status
      )
    }
  }

  async findByNit(nit: string): Promise<CompanyEntity | null> {
    const existing = await this.prisma.company.findUnique({
        where: { nit: nit },
      });

      if(!existing) return null

      return  new CompanyEntity (
        existing.id,
        existing.nit,
        existing.commercialName,
        existing.address??'',
        existing.description,
        existing.cellPhoneNumber??'',
        existing.dateCreation,
        existing.eliminated,
        )

  }


}
