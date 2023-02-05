import { Controller, Post, Body, Get } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('Grade-book')
export class UserController {
    constructor( private userservice: UserService) {}

    @Post('add-grade')
    addGrade ( @Body() userdto: UserDto): string{
        const grade = this.userservice.insert(userdto);
        return `Grade for ${grade.subject} added successfully. CGPA: ${this.userservice.calculateCGPA()}`;
    }

    @Get('calculate-cgpa')
    calculateCGPA(): number {
        return this.userservice.calculateCGPA();
    }

}