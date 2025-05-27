import { ApiProperty } from "@nestjs/swagger";
import { DepartmentEntity } from "src/modules/department/domain/entities/department.entity";

export class ListResponseEmployeePayloadType {
    
    @ApiProperty() id: number;
    @ApiProperty() identificationNumber: string;
    @ApiProperty() position: string;
    @ApiProperty() email: string;
    @ApiProperty() firstName: string;
    @ApiProperty() lastName: string;
    @ApiProperty() address: string;
    @ApiProperty() cellPhoneNumber: string;
    @ApiProperty() department: {
        id: number;
        name: string;
    };
    @ApiProperty() state: boolean;
    @ApiProperty() eliminated: boolean;
}