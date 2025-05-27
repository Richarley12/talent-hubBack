import { HttpException, HttpStatus } from "@nestjs/common"

export class CompanyEntity {
    constructor(
        public readonly id: string,
        public readonly nit: string,
        public readonly commercialName: string,
        public readonly address: string,
        public readonly description:  string | null,
        public readonly cellPhoneNumber:  string,
        public readonly dateCreation: Date,
        public readonly eliminated: boolean,
    ) {this.validate()    }

   private validate() {
    if(!this.nit?.trim()) throw new HttpException('Nit es requerido',HttpStatus.BAD_REQUEST)
    if(!this.commercialName?.trim()) throw new HttpException('Commercial name es requerido',HttpStatus.BAD_REQUEST)
    if(!this.address?.trim()) throw new HttpException('Address es requerido',HttpStatus.BAD_REQUEST)
    if(!this.cellPhoneNumber?.trim()) throw new HttpException('Cell phone number es requerido',HttpStatus.BAD_REQUEST)
    if(!this.dateCreation) throw new HttpException('Date creation es requerido',HttpStatus.BAD_REQUEST)    
    }


}