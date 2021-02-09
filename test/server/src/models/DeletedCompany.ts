import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import DeletedCompanyImage from './DeletedCompanyImage';

@Entity('deleted_companies')
export default class DeletedCompany {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    business: string;

    @Column()
    cnpj: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column()
    uf: string;

    @Column()
    password: string;

    @Column()
    is_active:number;

    @OneToMany(() => DeletedCompanyImage, deleted_company_image => deleted_company_image.deleted_company, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'deleted_company_id' })
    deleted_company_images: DeletedCompanyImage[];
}