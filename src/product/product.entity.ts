import { ReceivementEntity } from 'src/receivement/receivement.entity';
import { SaleEntity } from 'src/sale/sale.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column('text', {nullable : true})
  description: string;

  @Column()
  quantity: number;

  @OneToMany(() => ReceivementEntity, receivement => receivement.product, {cascade: true, onUpdate: "CASCADE"})
  receivement: ReceivementEntity[]

  @OneToMany(() => SaleEntity, sale => sale.product, {cascade: true, onUpdate: "CASCADE"})
  sale: SaleEntity[]

}