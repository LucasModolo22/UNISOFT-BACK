import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class SaleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    client_name: string;

    @Column('timestamp', { default: new Date() })
    date: Date;

    @Column()
    price: number;

    @OneToMany(type => ProductEntity, product => product.id)
    @JoinColumn()
    product: ProductEntity;

    @Column()
    quantity: number;

}