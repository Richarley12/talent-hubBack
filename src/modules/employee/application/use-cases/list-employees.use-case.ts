import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";
import { FilterEmployeeDto } from "../dto/filter-employee.dto";
import { PaginationResultDto } from "src/shared/dto/pagiantion-result.dto";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { ListResponseEmployeePayloadType } from "../../domain/dto/listResponse-employee-payload.type";

@Injectable()
export class ListEmployeesUseCase {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: EmployeeRepository) { }

  async execute(companyId: string, query: FilterEmployeeDto): Promise<PaginationResultDto<ListResponseEmployeePayloadType>> {
    const limit = query.limit && !isNaN(+query.limit) ? Number(query.limit) : 8
    const page = query.page && !isNaN(+query.page) ? Number(query.page) : 1
    const skip = (page - 1) * limit;

    if (query.startDate && query.endDate) {
      const start = new Date(query.startDate);
      const end = new Date(query.endDate);
      if (start > end) {
        throw new HttpException('La fecha de inicio no puede ser mayor que la de fin', HttpStatus.BAD_REQUEST);
      }
    }

    const [data, count] = await Promise.all([
      this.employeeRepository.findAllByCompany(companyId, query, skip, limit),
      this.employeeRepository.countByCompany(companyId, query),
    ]);
    const lastPage = Math.ceil(count / limit);
    if (page!=1 && page > lastPage) {
      throw new HttpException(`La página solicitada (${page}) supera la última página (${lastPage})`, HttpStatus.BAD_REQUEST);
    }

    return new PaginationResultDto(data, count, page, limit);
  }
}