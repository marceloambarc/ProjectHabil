import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import Image from './Image';

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    price: string;

    @Column()
    description: string;

    @Column()
    date: string;

    @Column()
    company_id: string;

    @OneToMany(() => Image, image => image.product, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'product_id' })
    images: Image[];
}