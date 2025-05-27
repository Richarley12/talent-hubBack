import { PrismaService } from "src/config/prisma/prisma.service";
import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { EmployeeRepository } from "../../domain/repositories/employee.repository";
import { UpdateEmployeetPayload } from "../../domain/dto/update-employee-payload.type";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FilterEmployeeDto } from "../../application/dto/filter-employee.dto";
import { ListResponseEmployeePayloadType } from "../../domain/dto/listResponse-employee-payload.type";

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
    constructor(
        private readonly prisma: PrismaService) {}
  
        async create(entity: EmployeeEntity): Promise<EmployeeEntity> {

            const existing = await this.prisma.employee.findUnique({
                where: { identificationNumber: entity.identificationNumber },
              });

              if (existing) {
                throw new HttpException('Ya existe un empleado con ese con ese documento', HttpStatus.CONFLICT);
              }

              const existingEmail = await this.prisma.employee.findFirst({
                where: {
                  email: entity.email.toLowerCase(),
                  companyId: entity.companyId,
                  eliminated: false, // si aplica
                },
              });
              
              if (existingEmail) {
                throw new HttpException(`El correo ${entity.email} ya está registrado para esta empresa`, HttpStatus.BAD_REQUEST);
              }
            
            const created = await this.prisma.employee.create({
              data: {
                identificationNumber: entity.identificationNumber,
                position: entity.position,
                email: entity.email,
                firstName: entity.firstName,
                lastName: entity.lastName,
                address: entity.address,
                cellPhoneNumber: entity.cellPhoneNumber,
                departmentId: entity.departmentId,
                companyId: entity.companyId,
                state: entity.state,
                eliminated: entity.eliminated,
              },
            });
          
            return new EmployeeEntity(
              created.id,
              created.identificationNumber,
              created.position,
              created.email,
              created.firstName,
              created.lastName,
              created.address,
              created.cellPhoneNumber,
              created.departmentId,
              created.companyId,
              created.state,
              created.eliminated,
            );
          }
          
  
    async update(id: number, data: UpdateEmployeetPayload, companyId: string): Promise<EmployeeEntity> {
      const existing = await this.prisma.employee.findUnique({ where: { id } });
      if (!existing || existing.companyId !== companyId) {
        throw new HttpException('No tiene permisos sobre este empleado', HttpStatus.FORBIDDEN);
      }
  
      const updated = await this.prisma.employee.update({
        where: { id },
        data,
      });
  
      return new EmployeeEntity(
        updated.id,
              updated.identificationNumber,
              updated.position,
              updated.email,
              updated.firstName,
              updated.lastName,
              updated.address,
              updated.cellPhoneNumber,
              updated.departmentId,
              updated.companyId,
              updated.state,
              updated.eliminated,
      );
    }
  
    async delete(id: number, companyId: string): Promise<void> {
      const existing = await this.prisma.employee.findUnique({ where: { id } });
      if (!existing || existing.companyId !== companyId) {
        throw new HttpException('No tiene permisos sobre este empleado', HttpStatus.FORBIDDEN);
      }
  
      await this.prisma.employee.update({
        where: { id },
        data: { eliminated: true },
      });
    }
  
    async findAllByCompany(companyId: string, filters: FilterEmployeeDto, skip:number, take:number): Promise<ListResponseEmployeePayloadType[]> {
        const results = await this.prisma.employee.findMany({
          where: {
            companyId,
            eliminated: false,
            ...(filters.state !== undefined && { state: filters.state }),
            ...(filters.departmentId && { departmentId: filters.departmentId }),
            ...(filters.startDate && filters.endDate && {
              dateCreation: {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
              },
            }),
          },
          include: {
            department: true,
          },
          skip,
          take,
          orderBy: { dateCreation: 'desc' },
        });
    
        return results.map((e) => (
          {
            id: e.id,
            identificationNumber: e.identificationNumber,
            position: e.position,
            email: e.email,
            firstName: e.firstName,
            lastName: e.lastName,
            address: e.address,
            cellPhoneNumber: e.cellPhoneNumber,
            department: {
              id: e.department.id,
              name: e.department.name
            },
            state: e.state,
            eliminated: e.eliminated,
          }));
          
      }
    
      async countByCompany(companyId: string, filters: FilterEmployeeDto): Promise<number> {
        return this.prisma.employee.count({
          where: {
            companyId,
            eliminated: false,
            ...(filters.state !== undefined && { state: filters.state }),
            ...(filters.departmentId && { departmentId: filters.departmentId }),
            ...(filters.startDate && filters.endDate && {
              dateCreation: {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
              },
            }),
          },
        });
      }
  
    async findById(id: number): Promise<EmployeeEntity | null> {
      const emp = await this.prisma.employee.findUnique({ where: { id } });
      if (!emp) return null;
      return new EmployeeEntity(
        emp.id,
        emp.identificationNumber,
        emp.position,
        emp.email,
        emp.firstName,
        emp.lastName,
        emp.address,
        emp.cellPhoneNumber,
        emp.departmentId,
        emp.companyId,
        emp.state,
        emp.eliminated,
      );
    }
  }
  