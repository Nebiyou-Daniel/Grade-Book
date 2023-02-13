import { Post, Controller, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoLogin, AuthDtoSignup } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDtoSignup){
        return this.authService.signup(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthDtoLogin){
        return this.authService.login(dto);
    }
}
