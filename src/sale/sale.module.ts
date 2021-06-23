import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ProductEntity])],
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
