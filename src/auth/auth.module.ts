import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
