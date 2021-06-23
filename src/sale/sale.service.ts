import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        let sale: any = await this.saleRepository.create(data);
        let product = await this.productRepository.findOne(sale.product);
        let transacao = product.quantity - parseInt(sale.quantity)
        if(transacao < 0){
            throw new HttpException({msg: `O estoque não pode ficar abaixo de 0. O estoque atual é ${product.quantity} e você está tentando retirar ${sale.quantity}`}, HttpStatus.BAD_REQUEST)
        }
        await this.saleRepository.save(sale);
        await this.productRepository.update(product.id, {quantity: transacao});
        return await this.saleRepository.findOne(sale.id, {relations: ['product']})
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
        let sale: any = await this.findOne(id)
        let product = await this.productRepository.findOne(sale.product);
        await this.saleRepository.delete(id);
        await this.productRepository.update(product.id, {quantity : product.quantity + parseInt(sale.quantity)});
        return { success : true}
    }

}
