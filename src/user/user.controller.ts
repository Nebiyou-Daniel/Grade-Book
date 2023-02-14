import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PasswordUpdateDto, ProfileUpdateDto, GradeSystemUpdateDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor( private userservice: UserService) {}
    
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }
    @Get('grading')
    getGradingSystem(@GetUser('id') userId: number,){
        return this.userservice.getGradingSystem(userId);
    }

    @Patch('me/password')
    updatePassword(@GetUser() user: User, @Body() dto:PasswordUpdateDto){
        return this.userservice.updatePassword(user,dto);
    }

    @Patch('me/profile')
    updateProfile(@GetUser() user, @Body() dto:ProfileUpdateDto){
        return this.userservice.updateProfile(user,dto);
    }

    @Patch('me/gradingsys')
    updateGradingSystem(@GetUser('id') userId: number, @Body() dto: GradeSystemUpdateDto){
        return this.userservice.updateGradingSystem(userId, dto);
    }
}
