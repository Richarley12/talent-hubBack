import { Module } from '@nestjs/common';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { PrismaEmployeeRepository } from './infrastructure/repositories/prisma-employee.repository';
import { CreateEmployeeUseCase } from './application/use-cases/create-employee.use-case';
import { UpdateEmployeeUseCase } from './application/use-cases/update-employee.use-case';
import { DeleteEmployeeUseCase } from './application/use-cases/delete-employee.use-case';
import { ListEmployeesUseCase } from './application/use-cases/list-employees.use-case';
import { UploadEmployeesUseCase } from './application/use-cases/upload-employees.use-case';
import { DepartmenModules } from '../department/department.modules';


@Module({
    imports: [DepartmenModules],
    controllers: [EmployeeController],
    providers: [
        {
            provide: 'EmployeeRepository',
            useClass: PrismaEmployeeRepository,
        },
        CreateEmployeeUseCase,
        UpdateEmployeeUseCase,
        DeleteEmployeeUseCase,
        ListEmployeesUseCase,
        UploadEmployeesUseCase
    ],
    exports:[]
})
export class EmployeeModules { }
