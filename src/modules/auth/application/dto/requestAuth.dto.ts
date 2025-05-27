import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RequestAuth {
    
    @IsString()
    @ApiProperty()
    frontendKey:string

}