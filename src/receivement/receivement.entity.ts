import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class ReceivementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default : new Date() })
    date: Date;

    @OneToOne(type => ProductEntity)
    @JoinColumn()
    product: ProductEntity;

    @Column()
    quantity: number;

}