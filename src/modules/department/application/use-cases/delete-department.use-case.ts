import { Inject, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../domain/repositories/department.repository';

@Injectable()
export class DeleteDepartmentUseCase {
  constructor(
    @Inject('DepartmentRepository')
    private readonly departmentRepository: DepartmentRepository) {}

    async execute(id: number, companyId: string): Promise<void> {
      return this.departmentRepository.delete(id, companyId);
    }
}
