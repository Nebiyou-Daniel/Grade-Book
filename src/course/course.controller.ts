import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';;
import { ParseIntPipe } from '@nestjs/common/pipes';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './course.service';
import { AddCourseDto, EditCourseDto, GPADto } from './dto';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService){}

    @Get()
    getCourse(@GetUser('id') userId: number){
        return this.courseService.getCourse(userId);
    }

    @Get('cgpa')
    getCGPA(@GetUser('id') userId: number){
        return this.courseService.getCGPA(userId);
    }

    @Get('gpa')
    getGPA(@GetUser('id') userId: number, @Body() dto: GPADto){
        return this.courseService.getGPA(userId, dto);
    }
    @Get('allGpa')
    getAllGPA(@GetUser('id') userId: number){
        return this.courseService.getAllGPA(userId);
    }

    @Get('/:id')
    getCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
        return this.courseService.getCourseById(userId, courseId);
    }

    @Post('add')    
    addCourse(@GetUser('id') userId: number, @Body() dto: AddCourseDto){
        return this.courseService.addCourse(userId, dto);

    }


    @Patch('/:id')
    editCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number, @Body() dto: EditCourseDto){
        return this.courseService.editCourseById(userId, courseId, dto);

    }

    @Delete('/:id')
    removeCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
        return this.courseService.removeCourseById(userId, courseId);

    }

}
