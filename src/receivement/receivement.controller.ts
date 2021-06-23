import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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

    @Put(':id')
    @UseGuards(AuthGuard("jwt"))
    update(@Param() id : number, @Body() data : Partial<ReceivementDto>) {
        return this.receivementService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard("jwt"))
    delete(@Param() id : number) {
        return this.receivementService.delete(id);
    }

}
