import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class ReceivementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToMany(() => ProductEntity, { cascade : true })
    @JoinTable()
    product: ProductEntity[];

    @Column()
    quantity: number;

    @ManyToOne(type => UserEntity, user => user.id)
    @JoinTable()
    user : UserEntity;

}