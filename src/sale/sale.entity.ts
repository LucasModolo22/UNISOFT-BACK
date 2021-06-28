import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { ProductSaleEntity } from './product-sale.entity';

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

    @ManyToMany(() => ProductSaleEntity, { cascade: true })
    @JoinTable()
    product: ProductSaleEntity[];

    @Column()
    quantity: number;

    @ManyToOne(type => UserEntity, user => user.id)
    @JoinTable()
    user : UserEntity;

}