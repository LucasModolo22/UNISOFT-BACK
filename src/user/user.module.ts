import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController]
})
export class UserModule { }
