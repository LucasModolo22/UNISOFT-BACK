import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductSaleEntity } from './product-sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ProductEntity, ProductSaleEntity])],
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
