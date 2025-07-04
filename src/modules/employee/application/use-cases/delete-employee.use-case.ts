import { Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";

@Injectable()
export class DeleteEmployeeUseCase {
    constructor(
      @Inject('EmployeeRepository') 
      private readonly employeeRepository: EmployeeRepository) {}
    async execute(id: number, companyId: string): Promise<void> {
      return this.employeeRepository.delete(id, companyId);
    }
  }