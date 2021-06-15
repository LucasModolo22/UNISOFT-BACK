import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/auth/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, AuthService, JwtService],
  controllers: [UserController]
})
export class UserModule {}
