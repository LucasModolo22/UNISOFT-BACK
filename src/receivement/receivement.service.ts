import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { ProductSaleEntity } from 'src/sale/product-sale.entity';
import { Repository } from 'typeorm';
import { ProductReceivementEntity } from './product-receivement.entity';
import { ReceivementEntity } from './receivement.entity';

@Injectable()
export class ReceivementService {

    constructor(
        @InjectRepository(ReceivementEntity)
        private readonly receivementRepository: Repository<ReceivementEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductReceivementEntity)
        private readonly productReceivementEntity : Repository<ProductSaleEntity>
    ) { }

    async find() {
        return await this.receivementRepository
            .createQueryBuilder('receivement')
            .leftJoinAndSelect('receivement.products', 'product_receivement')
            .leftJoinAndSelect('product_receivement.product', 'product')
            .leftJoinAndSelect('receivement.user', 'user')
            .getMany()
    }

    async findOne(id: number) {
        return await this.receivementRepository
            .createQueryBuilder('receivement')
            .where({id})
            .leftJoinAndSelect('receivement.products', 'product_receivement')
            .leftJoinAndSelect('product_receivement.product', 'product')
            .leftJoinAndSelect('receivement.user', 'user')
            .getOne()
    }

    async create(data: any) {
        let receivement: any = await this.receivementRepository.create(data);
        await data.products.forEach(async (productSales) => {
            let ps : any = await this.productReceivementEntity.create(productSales);
            let product = await this.productRepository.findOne(ps.product.id)
            let transaction = product.quantity + ps.quantity;
            await this.productRepository.update(product.id, { quantity: transaction });
            await this.productReceivementEntity.save(ps)
        })
        await this.receivementRepository.save(receivement);
        return await this.receivementRepository
            .createQueryBuilder('receivement')
            .where({id: receivement.id})
            .leftJoinAndSelect('receivement.products', 'product_receivement')
            .leftJoinAndSelect('product_receivement.product', 'product')
            .leftJoinAndSelect('receivement.user', 'user')
            .getOne()
    }

    async findByProduct(id: number) {
        return await this.receivementRepository.find({
            where: {
                product: id
            },
            relations: ['products', 'product.product', 'user']
        })
    }

    async update(id: number, data : any) {
        await this.receivementRepository.update(id, data);
        return await this.receivementRepository.findOne(id);
    }

    async delete(id : number) {
        let receivement: any = await this.findOne(id)
        await receivement.products.forEach(async (productSales) => {
            let ps : any = await this.productReceivementEntity.findOne(productSales.id, { relations: ['product'] });
            let product = await this.productRepository.findOne(ps.product.id)
            let transaction = product.quantity - ps.quantity;
            await this.productRepository.update(product.id, { quantity: transaction });
        })
        await this.receivementRepository.delete(id);
        return { success : true}
    }

}
