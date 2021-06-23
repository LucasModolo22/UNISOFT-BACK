import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class ReceivementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(type => ProductEntity, product => product.receivement, {cascade: ["insert", "update"]})
    product: ProductEntity;

    @Column()
    quantity: number;

}