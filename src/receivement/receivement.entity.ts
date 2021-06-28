import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { ProductReceivementEntity } from './product-receivement.entity';

@Entity()
export class ReceivementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToMany(() => ProductReceivementEntity, { cascade : true })
    @JoinTable()
    product: ProductReceivementEntity[];

    @Column()
    quantity: number;

    @ManyToOne(type => UserEntity, user => user.id)
    @JoinTable()
    user : UserEntity;

}