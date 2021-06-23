import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ) {}

    @Post("login")
    login(@Body() data) {
        return this.authService.login(data);
    }

    @Post()
    create(@Body() data : Partial<UserDto>) {
        return this.userService.create(data)
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    find() {
        return this.userService.find();
    }

    @Get(':id')
    @UseGuards(AuthGuard("jwt"))
    findOne(@Param('id') id : number) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard("jwt"))
    update(@Param() id : number, @Body() data : Partial<UserDto>) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard("jwt"))
    delete(@Param() id : number) {
        return this.userService.delete(id);
    }

}
