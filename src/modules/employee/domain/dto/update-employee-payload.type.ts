import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateEmployeetPayload {
    @IsOptional()
    @ApiProperty()
      email?:string;

      @IsOptional()
      @ApiProperty()
      firstName?:string;
      
      @IsOptional()
      @ApiProperty()
      lastName?:string;

      @IsOptional()
      @ApiProperty()
      address?:string;

      @IsOptional()
      @ApiProperty()
      cellPhoneNumber?:string;
      
      @IsOptional()
      @ApiProperty()
      departmentId?:number;
      
      @IsOptional()
      @ApiProperty()
      position?:string;
      
      @IsOptional()
      @ApiProperty()
      state?:boolean
  };
  
