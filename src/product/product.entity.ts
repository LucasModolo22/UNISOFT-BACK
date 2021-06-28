import { ReceivementEntity } from 'src/receivement/receivement.entity';
import { SaleEntity } from 'src/sale/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', {nullable : true})
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

}