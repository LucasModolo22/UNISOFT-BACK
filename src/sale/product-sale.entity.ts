import { ProductEntity } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class ProductSaleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(type => ProductEntity, product => product.id, { cascade: true })
    @JoinTable()
    product : ProductEntity;

}