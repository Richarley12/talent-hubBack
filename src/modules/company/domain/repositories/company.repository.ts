import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "../entities/company.entity";

export interface CompanyRepository {
  create(company: CompanyEntity): Promise<CompanyEntity>;
  findByNit(nit: string): Promise<CompanyEntity | null>;
}
