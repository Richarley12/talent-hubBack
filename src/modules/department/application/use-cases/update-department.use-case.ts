import { Inject, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { DepartmentEntity } from '../../domain/entities/department.entity';
import { UpdateDepartmentPayload } from '../../domain/dto/update-department-payload.type';

@Injectable()
export class UpdateDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepository')
    private readonly departmentRepository: DepartmentRepository) {}

    async execute(id: number, data: UpdateDepartmentPayload, companyId: string): Promise<DepartmentEntity> {
      return this.departmentRepository.update(id, data, companyId);
    }
}
