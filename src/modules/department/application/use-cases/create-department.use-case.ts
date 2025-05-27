import { Inject, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { DepartmentEntity } from '../../domain/entities/department.entity';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepository')
    private readonly departmentRepository: DepartmentRepository
  ) {}

  async execute(data: { name: string; description?: string; companyId: string }): Promise<DepartmentEntity> {
    const department = new DepartmentEntity(
      0,
      data.name,
      data.description ?? '',
      false,
      data.companyId,
    );

    return this.departmentRepository.create(department);
  }
}
