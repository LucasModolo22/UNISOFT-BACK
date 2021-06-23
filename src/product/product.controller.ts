import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from './product-dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService : ProductService
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    find() {
        return this.productService.find()
    }

    @Get(':id')
    @UseGuards(AuthGuard("jwt"))
    findOne(@Param() id : number) {
        return this.productService.findOne(id);
    }

    @Post() 
    @UseGuards(AuthGuard("jwt"))
    create(@Body() data : Partial<ProductDto>) {
        return this.productService.create(data)
    }

    @Put(':id')
    @UseGuards(AuthGuard("jwt"))
    update(@Param() id : number, @Body() data : Partial<ProductDto>) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard("jwt"))
    delete(@Param() id : number) {
        return this.productService.delete(id);
    }

}
