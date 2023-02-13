import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
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
}
