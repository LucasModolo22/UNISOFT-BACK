import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class SaleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    client_name: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({type: "float"})
    price: number;

    @ManyToOne(type => ProductEntity, product => product.sale, {cascade: ["insert", "update"]})
    product: ProductEntity;

    @Column()
    quantity: number;

}