import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountUserEntity {
    constructor(
        public readonly id:string,
        public readonly email: string,
        public readonly resetKey: string | null,
        public readonly state:boolean,
        public readonly companyId: string,
        public readonly employeeId?:  string,
    ){
        if  (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new HttpException('Formato de correo no válido',HttpStatus.BAD_REQUEST);
    }
}