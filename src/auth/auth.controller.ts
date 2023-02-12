import { Post, Controller, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoLogIn, AuthDtoSignUp } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDtoSignUp){
        return this.authService.signup(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthDtoLogIn){
        return this.authService.login(dto);
    }
}
