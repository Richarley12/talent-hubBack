import { Module } from '@nestjs/common';
import { PrismaCompanyRepository } from './infrastructure/repositories/prisma-company.repository';

@Module({
    providers: [
        {
          provide: 'CompanyRepository',
          useClass: PrismaCompanyRepository,
        },
      ],
      exports: ['CompanyRepository'],
})
export class CompanyModules {}
