import { ReceivementEntity } from 'src/receivement/receivement.entity';
import { SaleEntity } from 'src/sale/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', {nullable : true})
  description: string;

  @Column()
  quantity: number;

  @OneToMany(() => ReceivementEntity, receivement => receivement.product, {cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
  receivement: ReceivementEntity[]

  @OneToMany(() => SaleEntity, sale => sale.product, {cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
  sale: SaleEntity[]

}