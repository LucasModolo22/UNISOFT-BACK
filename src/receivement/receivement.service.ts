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
        return await this.receivementRepository.find({relations: ['product']});
    }

    async findOne(id: number) {
        return await this.receivementRepository.findOne(id, {relations: ['product']})
    }

    async create(data: any) {
        let receivement: any = await this.receivementRepository.create(data);
        let product = await this.productRepository.findOne(receivement.product);
        await this.receivementRepository.save(receivement);
        await this.productRepository.update(product.id, {quantity : product.quantity + parseInt(receivement.quantity)});
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

    async update(id: number, data : any) {
        await this.receivementRepository.update(id, data);
        return await this.receivementRepository.findOne(id);
    }

    async delete(id : number) {
        let receivement: any = await this.findOne(id)
        let product = await this.productRepository.findOne(receivement.product);
        await this.receivementRepository.delete(id);
        await this.productRepository.update(product.id, {quantity : product.quantity - parseInt(receivement.quantity)});
        return { success : true}
    }

}
