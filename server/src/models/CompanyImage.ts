import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Company from './Company';

@Entity('companyImages')
export default class CompanyImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Company, company => company.companyImages)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}