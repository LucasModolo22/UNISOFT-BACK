import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user-dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async find() {
        return await this.usersRepository.find();
    }

    async findOne(id : number) {
        return await this.usersRepository.findOne(id);
    }

    async update(id: number, data : Partial<UserDto>) {
        await this.usersRepository.update(id, data);
        return await this.usersRepository.findOne(id);
    }

    async delete(id : number) {
        await this.usersRepository.delete(id);
        return { success : true}
    }

    async create(data : Partial<UserDto>) {
        let user = await this.usersRepository.create(data);
        await this.usersRepository.save(user);
        return await this.usersRepository.findOne(user.id)
    }

}
