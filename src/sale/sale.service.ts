import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { SaleDto } from './sale-dto';
import { SaleEntity } from './sale.entity';

@Injectable()
export class SaleService {

    constructor(
        @InjectRepository(SaleEntity)
        private readonly saleRepository : Repository<SaleEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository : Repository<ProductEntity>
    ) {}


    async find() {
        return await this.saleRepository.find({relations: ['product']});
    }

    async findOne(id: number) {
        return await this.saleRepository.findOne(id, {relations: ['product']})
    }

    async create(data: any) {
        let receivement: any = await this.saleRepository.create(data);
        await this.saleRepository.save(receivement);
        let product = await this.productRepository.findOne(receivement.product);
        await this.productRepository.update(product.id, {quantity : product.quantity - parseInt(receivement.quantity)});
        return await this.saleRepository.findOne(receivement.id, {relations: ['product']})
    }

    async findByProduct(id: number) {
        return await this.saleRepository.find({
            where: {
                product: id
            },
            relations: ['product']
        })
    }

    async update(id: number, data : any) {
        await this.saleRepository.update(id, data);
        return await this.saleRepository.findOne(id);
    }

    async delete(id : number) {
        await this.saleRepository.delete(id);
        return { success : true}
    }

}
