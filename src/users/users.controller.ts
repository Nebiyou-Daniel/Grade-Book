import { Controller,Body,Patch, Param, ParseIntPipe } from '@nestjs/common';
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto } from './dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Patch(':Id/profile')
    async updateProfile(@Body() dto: ProfileUpdateDto, @Param('Id', ParseIntPipe) Id){
        return this.usersService.updateProfile(Id ,dto)
    }

    @Patch(':Id/password')
    async updatePassword(@Body() dto: PasswordUpdateDto, @Param("Id", ParseIntPipe) Id){
        return this.usersService.updatePassword(Id, dto)
    }

    @Patch(':Id/gradingSystem')
    async updateGradeSystem(@Body() dto: GradeSystemUpdateDto, @Param("Id", ParseIntPipe) Id){

    }
}
