import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class ReceivementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default : new Date() })
    date: Date;

    @OneToMany(type => ProductEntity, product => product.id)
    @JoinColumn()
    product: ProductEntity;

    @Column()
    quantity: number;

}