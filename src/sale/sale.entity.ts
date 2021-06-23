import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class SaleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    client_name: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column()
    price: number;

    @OneToOne(type => ProductEntity)
    @JoinColumn()
    product: ProductEntity;

    @Column()
    quantity: number;

}