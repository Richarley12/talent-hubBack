import { HttpException, HttpStatus } from "@nestjs/common"

export class DepartmentEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string | null,
        public readonly eliminated: boolean,
        public readonly companyId: string,
    ) {this.validate()    }

   private validate() {
    if(!this.name?.trim()) throw new HttpException('Name es requerido',HttpStatus.BAD_REQUEST)
    if(!this.companyId) throw new HttpException('Company id es requerido',HttpStatus.BAD_REQUEST)   
   }
}