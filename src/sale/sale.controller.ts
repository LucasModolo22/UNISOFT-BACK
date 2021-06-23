import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaleDto } from './sale-dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {

    constructor(
        private readonly saleService : SaleService
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    find() {
        return this.saleService.find();
    }

    @Get(':id')
    @UseGuards(AuthGuard("jwt"))
    findOne(@Param('id') id : number) {
        return this.saleService.findOne(id)
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    create(@Body() data : Partial<SaleDto>) {
        return this.saleService.create(data)
    }

    @Get('product/:id')
    @UseGuards(AuthGuard("jwt"))
    findByProduct(@Param('id') id : number) {
        return this.saleService.findByProduct(id);
    }

}
