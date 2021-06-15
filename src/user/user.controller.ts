import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly authService : AuthService
    ) {}

    @Post("login")
    login(@Body() data) {
        return this.authService.login(data);
    }

}
