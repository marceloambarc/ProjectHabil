import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import CompanyImage from './CompanyImage';

@Entity('companies')
export default class Company {
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

    @OneToMany(() => CompanyImage, companyImage => companyImage.company, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'company_id' })
    companyImages: CompanyImage[];
}