import { UpdateDepartmentPayload } from '../dto/update-department-payload.type';
import { DepartmentEntity } from '../entities/department.entity';

export interface DepartmentRepository {
  create(department: DepartmentEntity): Promise<DepartmentEntity>;
  update(id: number, data: UpdateDepartmentPayload,ompanyId: string): Promise<DepartmentEntity>;
  delete(id: number,ompanyId: string): Promise<void>;
  findAllByCompany(companyId: string,skip:number,limit:number): Promise<DepartmentEntity[]>;
  countByCompany(companyId: string): Promise<number>;
  findById(id: number): Promise<DepartmentEntity | null>;
}
