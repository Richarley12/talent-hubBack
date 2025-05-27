import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class RegisterCompanyDto {

    @IsNotEmpty()
    @ApiProperty()
    comercialName: string;

    @IsNotEmpty()
    @ApiProperty()
    nit: string;
  
    @IsEmail()
    @ApiProperty()
    email: string;
  
    @MinLength(8)
    @ApiProperty()
    password: string;
  
    @IsNotEmpty()
    @ApiProperty()
    cellPhoneNumber: string;
  
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsOptional()
    @ApiProperty()
    description?: string;

}