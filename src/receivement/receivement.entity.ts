import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, JoinTable } from 'typeorm';

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

    @OneToMany(type => UserEntity, user => user.id)
    @JoinTable()
    user : UserEntity;

}