import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
