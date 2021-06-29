import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { ReceivementModule } from './receivement/receivement.module';
import { SaleModule } from './sale/sale.module';
import { ReceivementEntity } from './receivement/receivement.entity';
import { SaleEntity } from './sale/sale.entity';
import { ProductSaleEntity } from './sale/product-sale.entity';
import { ProductReceivementEntity } from './receivement/product-receivement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'unisoft',
      synchronize: true,
      logging: false,
      extra: {
        ssl: false,
      },
      entities: [
        ProductEntity,
        UserEntity,
        ReceivementEntity,
        SaleEntity,
        ProductSaleEntity,
        ProductReceivementEntity
      ],
      migrations: [
        'src/migration/**/*.ts',
      ],
      subscribers: [
        'src/subscriber/**/*.ts',
      ],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    }),
    ProductModule,
    AuthModule,
    UserModule,
    ReceivementModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
