import { Module } from '@nestjs/common';
import { ReceivementService } from './receivement.service';
import { ReceivementController } from './receivement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivementEntity } from './receivement.entity';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceivementEntity, ProductEntity])],
  providers: [ReceivementService],
  controllers: [ReceivementController]
})
export class ReceivementModule {}
