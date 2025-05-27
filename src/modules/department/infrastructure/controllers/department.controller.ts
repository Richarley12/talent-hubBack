import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, Query, UseGuards, HttpStatus, HttpCode, HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateDepartmentDto } from '../../application/dto/create-department.dto';
import { UpdateDepartmentDto } from '../../application/dto/update-department.dto';
import { CompanyId } from 'src/shared/decorators/company-id.decorator';
import { CreateDepartmentUseCase } from '../../application/use-cases/create-department.use-case';
import { UpdateDepartmentUseCase } from '../../application/use-cases/update-department.use-case';
import { DeleteDepartmentUseCase } from '../../application/use-cases/delete-department.use-case';
import { ListDepartmentsUseCase } from '../../application/use-cases/list-departments.use-case';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@ApiTags('Departamentos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly createUseCase: CreateDepartmentUseCase,
    private readonly updateUseCase: UpdateDepartmentUseCase,
    private readonly deleteUseCase: DeleteDepartmentUseCase,
    private readonly listUseCase: ListDepartmentsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar departamentos de la empresa' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Listado de departamentos' })
  async findAll(
    @CompanyId() companyId: string,
    @Query() query: PaginationDto,
  ) {
    return this.listUseCase.execute(companyId, query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo departamento' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Departamento creado' })
  async create(
    @Body() dto: CreateDepartmentDto,
    @CompanyId() companyId: string,
  ) {
    return this.createUseCase.execute({ ...dto, companyId });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Departamento actualizado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
    @CompanyId() companyId: string,
  ) {
    return this.updateUseCase.execute(id, dto, companyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar (lógicamente) un departamento' })
  @ApiResponse({ status: 204, description: 'Departamento eliminado' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: string,
  ) {
    await this.deleteUseCase.execute(id, companyId);
  }
}
