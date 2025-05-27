import { HttpException, HttpStatus } from "@nestjs/common";

export class EmployeeEntity  {
    constructor(        
        public readonly id: number,
        public readonly identificationNumber:string,
        public readonly position:string,
        public readonly email:string,
        public readonly firstName:string,
        public readonly lastName:string,
        public readonly address:string,
        public readonly cellPhoneNumber:string,
        public readonly departmentId:number,
        public readonly companyId:string,
        public readonly state:boolean,
        public readonly eliminated:boolean,
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.identificationNumber?.trim()) throw new HttpException('Numero de identificación es requerido',HttpStatus.BAD_REQUEST);
        if (!this.position?.trim()) throw new HttpException('Cargo es requerido',HttpStatus.BAD_REQUEST);
        if (!this.firstName?.trim()) throw new HttpException('Priemros nombres es requerido',HttpStatus.BAD_REQUEST);
        if (!this.lastName?.trim()) throw new HttpException('Apellidos es requerido',HttpStatus.BAD_REQUEST);
        if  (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new HttpException('Formato de correo no válido',HttpStatus.BAD_REQUEST);
        if (!this.departmentId) throw new HttpException('Departamento es requerido',HttpStatus.BAD_REQUEST);
        if (!this.companyId) throw new HttpException('Empresa es requerido',HttpStatus.BAD_REQUEST);
    }

}