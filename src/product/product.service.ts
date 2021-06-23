import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product-dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository : Repository<ProductEntity>
    ) {}

    async find() {
        return await this.productRepository.find();
    }

    async findOne(id : number) {
        return await this.productRepository.findOne(id)
    }

    async create(data : Partial<ProductDto>) {
        let product = await this.productRepository.create(data);
        await this.productRepository.save(product);
        return await this.productRepository.findOne(product.id)
    }

    async delete(id : number) {
        await this.productRepository.delete(id);
        return { success : true}
    }

    async update(id: number, data : Partial<ProductDto>) {
        await this.productRepository.update(id, data);
        return await this.productRepository.findOne(id);
    }

}
