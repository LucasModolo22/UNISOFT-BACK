import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ nullable : false })
  pwd: string;

  @Column({unique: true})
  email: string;

  @Column({ nullable : true })
  name: string;

  @Column({ nullable : true })
  surname: string;

  @Column({ nullable : true })
  address: string;

  @Column({ nullable : true })
  cpf : string;

  @Column('timestamp')
  birth_date : Date;

  @BeforeInsert()
  async hashPassword() {
    this.pwd = await bcrypt.hash(this.pwd, 12);
  }

  @BeforeUpdate()
  async hashPassword2() {
    this.pwd = await bcrypt.hash(this.pwd, 12);
  }

}