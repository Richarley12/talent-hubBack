import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { DepartmentRepository } from "src/modules/department/domain/repositories/department.repository";

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: EmployeeRepository,
    @Inject('DepartmentRepository')
    private readonly departmentRepository: DepartmentRepository, // Agregado el repositorio de departamento
  ) { }
  async execute(dto: CreateEmployeeDto & { companyId: string }): Promise<EmployeeEntity> {

    const department = await this.departmentRepository.findById(dto.departmentId);

    if (!department || department.companyId !== dto.companyId) {
      throw new HttpException('El departamento seleccionado no pertenece a su empresa', HttpStatus.FORBIDDEN);
    }
    if (department.eliminated) {
      throw new HttpException('El departamento no se encuentra activo', HttpStatus.FORBIDDEN);
    }

    const entity = new EmployeeEntity(
      0,
      dto.identificationNumber,
      dto.position,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.address,
      dto.cellPhoneNumber,
      dto.departmentId,
      dto.companyId,
      true,
      false);
    return this.employeeRepository.create(entity);
  }
}