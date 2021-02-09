import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Company from './Company';

@Entity('company_images')
export default class CompanyImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Company, company => company.company_images)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}