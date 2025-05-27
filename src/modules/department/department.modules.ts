import { Module } from '@nestjs/common';
import { DepartmentController } from './infrastructure/controllers/department.controller';
import { PrismaDepartmentRepository } from './infrastructure/repositories/prisma-department.repository';
import { CreateDepartmentUseCase } from './application/use-cases/create-department.use-case';
import { DepartmentRepository } from './domain/repositories/department.repository';
import { UpdateDepartmentUseCase } from './application/use-cases/update-department.use-case';
import { DeleteDepartmentUseCase } from './application/use-cases/delete-department.use-case';
import { ListDepartmentsUseCase } from './application/use-cases/list-departments.use-case';

@Module({
    imports: [],
    controllers: [DepartmentController],
    providers: [
        {
            provide: 'DepartmentRepository',
            useClass: PrismaDepartmentRepository,
        },
        CreateDepartmentUseCase,
        UpdateDepartmentUseCase,
        DeleteDepartmentUseCase,
        ListDepartmentsUseCase,
    ],
    exports: ['DepartmentRepository'],

})
export class DepartmenModules { }
