import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  pwd: string;

  @Column({unique: true})
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @BeforeInsert()
  async hashPassword() {
    this.pwd = await bcrypt.hash(this.pwd, 12);
  }

  @BeforeUpdate()
  async hashPassword2() {
    this.pwd = await bcrypt.hash(this.pwd, 12);
  }

}