import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    nullable:true
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    nullable:true
  })
  description?: string;
}