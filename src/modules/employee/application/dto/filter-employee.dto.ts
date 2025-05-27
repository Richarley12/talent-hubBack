import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsInt, IsDateString, IsNumber } from 'class-validator';

export class FilterEmployeeDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === '1' || value === 1 || value === 'true') return true;
    if (value === '0' || value === 0 || value === 'false') return false;
    return value;
  })
  state?: boolean;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  })
  @ApiProperty({
    nullable: true,
  })
  departmentId?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    nullable: true,
  })
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    nullable: true,
  })
  endDate?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    nullable: true,
  })
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  })
  page?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    nullable: true,
  })
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  })
  limit?: number;
}