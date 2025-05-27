import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { DepartmentEntity } from '../../domain/entities/department.entity';
import { UpdateDepartmentPayload } from '../../domain/dto/update-department-payload.type';

@Injectable()
export class PrismaDepartmentRepository implements DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: DepartmentEntity): Promise<DepartmentEntity> {
    const created = await this.prisma.department.create({
      data: {
        name: entity.name,
        description: entity.description,
        companyId: entity.companyId,
      },
    });

    return new DepartmentEntity(
      created.id,
      created.name,
      created.description ?? '',
      created.eliminated,
      created.companyId,
    );
  }

  async update(id: number, data: UpdateDepartmentPayload, companyId: string,
  ): Promise<DepartmentEntity> {
    const department = await this.prisma.department.findUnique({ where: { id } });

    if (!department || department.companyId !== companyId) {
      throw new HttpException('No tiene permisos sobre este departamento',HttpStatus.FORBIDDEN);
    }

    const updated = await this.prisma.department.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return new DepartmentEntity(
      updated.id,
      updated.name,
      updated.description ?? '',
      updated.eliminated,
      updated.companyId,
    );
  }

  async delete(id: number,  companyId: string,
  ): Promise<void> {
    const department = await this.prisma.department.findUnique({ where: { id } });

    if (!department || department.companyId !== companyId) {
      throw new HttpException('No tiene permisos sobre este departamento',HttpStatus.FORBIDDEN);
    }

    await this.prisma.department.update({
      where: { id },
      data: { eliminated: true },
    });
  }
  async findAllByCompany(companyId: string, skip:number, take:number): Promise<DepartmentEntity[]> {
    const results = await this.prisma.department.findMany({
      where: { companyId, eliminated: false },
      skip,
      take,
      orderBy: { creationDate: 'desc' }, // opcional
    });
  
    return results.map((d) => new DepartmentEntity(
      d.id,
      d.name,
      d.description ?? '',
      d.eliminated,
      d.companyId,
    ));
  }

  async countByCompany(companyId: string): Promise<number> {
    return this.prisma.department.count({
      where: { companyId, eliminated: false },
    });
  }
  
  async findById(id: number): Promise<DepartmentEntity | null> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) return null;

    return new DepartmentEntity(
      department.id,
      department.name,
      department.description?? '',
      department.eliminated,
      department.companyId,
    )
  }
  
}
