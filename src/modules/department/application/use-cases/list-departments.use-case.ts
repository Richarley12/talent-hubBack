import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../domain/repositories/department.repository';
import { DepartmentEntity } from '../../domain/entities/department.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationResultDto } from 'src/shared/dto/pagiantion-result.dto';

@Injectable()
export class ListDepartmentsUseCase {
  constructor(
    @Inject('DepartmentRepository')
    private readonly departmentRepository: DepartmentRepository) {}

  async execute(companyId: string, query: PaginationDto): Promise<PaginationResultDto<DepartmentEntity>> {
   
     const limit= query.limit && !isNaN(+query.limit) ? Number(query.limit) : 8
    const page= query.page && !isNaN(+query.page) ? Number(query.page) : 1

    const skip = (page - 1) * limit;
  
    const [data, count] = await Promise.all([
      this.departmentRepository.findAllByCompany(companyId, skip, limit),
      this.departmentRepository.countByCompany(companyId),
    ]);

    const lastPage = Math.ceil(count / limit);
    if (page!=1 && page > lastPage) {
      throw new HttpException(`La página solicitada (${page}) supera la última página (${lastPage})`, HttpStatus.BAD_REQUEST);
    }
  
    return new PaginationResultDto(data, count, page, limit);
  }
  
}
