import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { ReceivementEntity } from './receivement.entity';

@Injectable()
export class ReceivementService {

    constructor(
        @InjectRepository(ReceivementEntity)
        private readonly receivementRepository: Repository<ReceivementEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    async find() {
        return await this.receivementRepository.find();
    }

    async findOne(id: number) {
        return await this.receivementRepository.findOne(id, {relations: ['product']})
    }

    async create(data: any) {
        let receivement: any = await this.receivementRepository.create(data);
        await this.receivementRepository.save(receivement);
        let product = await this.productRepository.findOne(receivement.product);
        await this.productRepository.update(product.id, {quantity : product.quantity + receivement.quantity});
        return await this.receivementRepository.findOne(receivement.id, {relations: ['product']})
    }

    async findByProduct(id: number) {
        return await this.receivementRepository.find({
            where: {
                product: id
            },
            relations: ['product']
        })
    }

}
