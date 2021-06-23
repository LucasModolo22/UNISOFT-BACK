import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReceivementDto } from './receivement-dto';
import { ReceivementService } from './receivement.service';

@Controller('receivement')
export class ReceivementController {


    constructor(
        private readonly receivementService : ReceivementService
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    find() {
        return this.receivementService.find();
    }

    @Get(':id')
    @UseGuards(AuthGuard("jwt"))
    findOne(@Param('id') id : number) {
        return this.receivementService.findOne(id)
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    create(@Body() data : Partial<ReceivementDto>) {
        return this.receivementService.create(data)
    }

    @Get('product/:id')
    @UseGuards(AuthGuard("jwt"))
    findByProduct(@Param('id') id : number) {
        return this.receivementService.findByProduct(id);
    }

}
