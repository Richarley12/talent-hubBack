import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEmployeeUseCase } from "../../application/use-cases/create-employee.use-case";
import { DeleteEmployeeUseCase } from "../../application/use-cases/delete-employee.use-case";
import { ListEmployeesUseCase } from "../../application/use-cases/list-employees.use-case";
import { UpdateEmployeeUseCase } from "../../application/use-cases/update-employee.use-case";
import { UploadEmployeesUseCase } from "../../application/use-cases/upload-employees.use-case";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FilterEmployeeDto } from "../../application/dto/filter-employee.dto";
import { CompanyId } from "src/shared/decorators/company-id.decorator";
import { CreateEmployeeDto } from "../../application/dto/create-employee.dto";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { UpdateEmployeeDto } from "../../application/dto/update-employee.dto";
import { ListResponseEmployeePayloadType } from "../../domain/dto/listResponse-employee-payload.type";
import { UpdateEmployeetPayload } from "../../domain/dto/update-employee-payload.type";

@ApiTags('Empleados')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly updateUseCase: UpdateEmployeeUseCase,
    private readonly deleteUseCase: DeleteEmployeeUseCase,
    private readonly listUseCase: ListEmployeesUseCase,
    private readonly uploadUseCase: UploadEmployeesUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar empleados de la empresa' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'departmentId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Listado de departamentos', type: [ListResponseEmployeePayloadType] })
  findAll(@CompanyId() companyId: string, @Query() query: FilterEmployeeDto) {
    return this.listUseCase.execute(companyId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo Empleado' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Departamento creado', type: EmployeeEntity  })
  create(
    @CompanyId() companyId: string, 
    @Body() dto: CreateEmployeeDto) {
    return this.createUseCase.execute({ ...dto, companyId });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un Empleado' })
  @ApiBody({ type: UpdateEmployeetPayload })
  @ApiResponse({ status: 200, description: 'Empleado actualizado' })
  update(
    @Param('id') id: string, 
    @CompanyId() companyId: string, 
    @Body() dto: UpdateEmployeetPayload) {
    const parsedId = parseInt(id, 10);      
    return this.updateUseCase.execute(parsedId, dto, companyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar (lógicamente) un empleado' })
  @ApiResponse({ status: 204, description: 'Empleado eliminado' })
  delete(
    @Param('id') id: string, 
    @CompanyId() companyId: string) {
    const parsedId = parseInt(id, 10);      
    return this.deleteUseCase.execute(parsedId, companyId);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // upload(@UploadedFile() file: Express.Multer.File, @CompanyId() companyId: string) {
  //   return this.uploadUseCase.execute(file, companyId);
  // }
}
