import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { ProductSaleEntity } from './product-sale.entity';
import { SaleDto } from './sale-dto';
import { SaleEntity } from './sale.entity';

@Injectable()
export class SaleService {

    constructor(
        @InjectRepository(SaleEntity)
        private readonly saleRepository: Repository<SaleEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductSaleEntity)
        private readonly productSaleRepository: Repository<ProductSaleEntity>
    ) { }


    async find() {
        return await this.saleRepository
            .createQueryBuilder('sale')
            .leftJoinAndSelect('sale.products', 'product_sale')
            .leftJoinAndMapOne('product_sale.product', 'product_sale.product', 'product')
            .leftJoinAndSelect('sale.user', 'user')
            .getMany()
    }

    async findOne(id: number) {
        return await this.saleRepository
            .createQueryBuilder('sale')
            .where({id})
            .leftJoinAndSelect('sale.products', 'product_sale')
            .leftJoinAndSelect('product_sale.product', 'product')
            .leftJoinAndSelect('sale.user', 'user')
            .getOne()
        // return await this.saleRepository.findOne(id, { relations: ['product', 'product.product', 'user'] })
    }

    async create(data: any) {
        let sale: any = await this.saleRepository.create(data);

        await data.products.forEach(async (productSales) => {
            let ps : any = await this.productSaleRepository.create(productSales);
            let product = await this.productRepository.findOne(ps.product.id)
            let transaction = product.quantity - ps.quantity;
            if (transaction < 0)
                throw new HttpException({ msg: `O estoque não pode ficar abaixo de 0. O estoque atual é ${product.quantity} e você está tentando retirar ${sale.quantity}` }, HttpStatus.BAD_REQUEST)

            await this.productRepository.update(product.id, { quantity: transaction });
            await this.productSaleRepository.save(ps)
        })

        await this.saleRepository.save(sale);
        return await this.saleRepository
            .createQueryBuilder('sale')
            .where({id: sale.id})
            .leftJoinAndSelect('sale.products', 'product_sale')
            .leftJoinAndSelect('product_sale.product', 'product')
            .leftJoinAndSelect('sale.user', 'user')
            .getOne()
    }

    async findByProduct(id: number) {
        return await this.saleRepository.find({
            where: {
                product: id
            },
            relations: ['products', 'product.product', 'user']
        })
    }

    async update(id: number, data: any) {
        await this.saleRepository.update(id, data);
        return await this.saleRepository.findOne(id);
    }

    async delete(id: number) {
        let sale: any = await this.findOne(id)
        await sale.products.forEach(async (productSales) => {
            let ps : any = await this.productSaleRepository.findOne(productSales.id, { relations: ['product'] });
            let product = await this.productRepository.findOne(ps.product.id)
            let transaction = Number(product.quantity) + Number(ps.quantity);
            if (transaction < 0)
                throw new HttpException({ msg: `O estoque não pode ficar abaixo de 0. O estoque atual é ${product.quantity} e você está tentando retirar ${sale.quantity}` }, HttpStatus.BAD_REQUEST)

            await this.productRepository.update(product.id, { quantity: transaction });
        })
        await this.saleRepository.delete(id);
        return { success: true }
    }

}
