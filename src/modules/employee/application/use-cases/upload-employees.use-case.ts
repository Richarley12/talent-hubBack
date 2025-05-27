import { Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";

@Injectable()
export class UploadEmployeesUseCase {
    constructor(
      @Inject('EmployeeRepository') 
      private readonly employeeRepository: EmployeeRepository) {}
    // async execute(file: Express.Multer.File, companyId: string) {
    //   // Lógica de lectura de Excel y validación por companyId
    //   return { message: 'Carga masiva procesada' };
    // }
  }