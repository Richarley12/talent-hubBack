import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { DepartmentRepository } from "src/modules/department/domain/repositories/department.repository";
import { UpdateEmployeetPayload } from "../../domain/dto/update-employee-payload.type";

@Injectable()
export class UpdateEmployeeUseCase {
    constructor(
      @Inject('EmployeeRepository') 
      private readonly employeeRepository: EmployeeRepository,
      @Inject('DepartmentRepository')
      private readonly departmentRepository: DepartmentRepository,
    ) {}
    async execute(id: number, dto: UpdateEmployeetPayload, companyId: string): Promise<EmployeeEntity> {

      if (dto.departmentId) {
        const department = await this.departmentRepository.findById(dto.departmentId); 
        if (!department || department.companyId !==companyId) {
          throw new HttpException('El departamento de destino no pertenece a su empresa', HttpStatus.FORBIDDEN);
        }
      }
      return this.employeeRepository.update(id, dto, companyId);
    }
  }