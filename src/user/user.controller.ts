import { Controller, Post, Body, Get, UseGuards, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PasswordUpdateDto, ProfileUpdateDto, GradeSystemUpdateDto } from './dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor( private userservice: UserService) {}
    
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }

    @Post('add')
    addGrade ( @Body() userdto: UserDto): string{
        const grade = this.userservice.insert(userdto);
        return `Grade for ${grade.subject} added successfully. CGPA: ${this.userservice.calculateCGPA()}`;
    }
    

    @Get('cgpa')
    calculateCGPA(): number {
        return this.userservice.calculateCGPA();
    }

    @Patch('me/password')
    updatePassword(@GetUser() user: User, @Body() dto:PasswordUpdateDto){
        return this.userservice.updatePassword(user,dto);
    }

    @Patch('me/profile')
    updateProfile(@GetUser() user, @Body() dto:ProfileUpdateDto){
        return this.userservice.updateProfile(user,dto);
    }

    @Patch('me/grade')
    updateGradingSystem(@GetUser() user, @Body() dto: GradeSystemUpdateDto){
        return this.userservice.updateGradingSystem(user,dto);
    }
}
