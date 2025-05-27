import { FilterEmployeeDto } from '../../application/dto/filter-employee.dto';
import { ListResponseEmployeePayloadType } from '../dto/listResponse-employee-payload.type';
import { UpdateEmployeetPayload } from '../dto/update-employee-payload.type';
import { EmployeeEntity } from '../entities/employee.entity';

export interface EmployeeRepository {
  create(entity: EmployeeEntity): Promise<EmployeeEntity>;
  update(id: number, data: UpdateEmployeetPayload, companyId: string): Promise<EmployeeEntity>;
  delete(id: number, companyId: string): Promise<void>;
  findAllByCompany(companyId: string, filters: FilterEmployeeDto, skip?: number, take?: number): Promise<ListResponseEmployeePayloadType[]>;
  countByCompany(companyId: string, filters: any): Promise<number>;
  findById(id: number): Promise<EmployeeEntity | null>;
}
