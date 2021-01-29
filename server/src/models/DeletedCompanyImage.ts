import { Entity, PrimaryGeneratedColumn,Column, ManyToOne, JoinColumn } from 'typeorm';
import DeletedCompany from './DeletedCompany';

@Entity('deleted_company_images')
export default class DeletedCompanyImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => DeletedCompany, deleted_company => deleted_company.deleted_company_images)
  @JoinColumn({ name: 'deleted_company_id' })
  deleted_company: DeletedCompany;
}