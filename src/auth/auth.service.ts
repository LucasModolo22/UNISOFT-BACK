import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {

    }

    async login(data: any) {
        const username = data.username;
        const user = await this.usersRepository.findOne({ where: { username }, select: ['username', 'id', 'pwd'] });

        if (user && await this.comparePassword(data.pwd, user.pwd)) {
            const payload = {
                "id": user.id,
            };
            const token = this.jwtService.sign(payload);
            const { pwd, ...result } = user;

            return { result, token };
        }

        throw new HttpException({msg: "Usuário não encontrado"}, HttpStatus.NOT_FOUND);
    }

    async comparePassword(attempt: string, pwd: string) {
        return await bcrypt.compare(attempt, pwd);
    }

}
