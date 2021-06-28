import { Module } from '@nestjs/common';
import { ReceivementService } from './receivement.service';
import { ReceivementController } from './receivement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivementEntity } from './receivement.entity';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import { ProductReceivementEntity } from './product-receivement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceivementEntity, ProductEntity, ProductReceivementEntity])],
  providers: [ReceivementService],
  controllers: [ReceivementController]
})
export class ReceivementModule {}
