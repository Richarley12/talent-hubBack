import { Module } from '@nestjs/common';
import { AuthController } from './auth/infrastructure/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DepartmenModules } from './department/department.modules';
import { EmployeeModules } from './employee/employee.modules';

@Module({
    imports:[AuthModule,DepartmenModules,EmployeeModules]
})
export class ModulesModule {}
