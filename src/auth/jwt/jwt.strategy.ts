import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '123',
        });
    }

    async validate(payload: any) {
        try {
            const validUser = await this.refreshUserData(payload.id, payload);

            return {
                id: validUser.id,
                username: validUser.username,
            };
        } catch (error) {
            throw new HttpException({msg: 'Usuário não encontrado'}, HttpStatus.UNAUTHORIZED);
        }

    }

    async refreshUserData(userId: number, user: any) {
        const dbUser = await this.usersRepository.findOne(userId)
        if (!dbUser) {
            throw new HttpException({msg: 'Usuário não encontrado'}, HttpStatus.NOT_FOUND);
        }

        return dbUser;
    }

}
