import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDto } from './product-dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService : ProductService
    ) {}

    @Get()
    find() {
        return this.productService.find()
    }

    @Get(':id')
    findOne(@Param() id : number) {
        return this.productService.findOne(id);
    }

    @Post() 
    create(@Body() data : Partial<ProductDto>) {
        return this.productService.create(data)
    }

    @Put(':id')
    update(@Param() id : number, @Body() data : Partial<ProductDto>) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    delete(@Param() id : number) {
        return this.productService.delete(id);
    }

}
