import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';;
import { ParseIntPipe } from '@nestjs/common/pipes';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './course.service';
import { AddCourseDto, EditCourseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService){}

    @Get()
    getCourse(@GetUser('id') userId: number){
        return this.courseService.getCourse(userId);
    }

<<<<<<< HEAD
    @Get('/:id')
    getourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
=======
    @Get('getCourse')
    getcourseByName(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
>>>>>>> 5962f595bef23cbc23f9675b5f5d8f7797ecf824
        return this.courseService.getCourseById(userId, courseId);

    }

<<<<<<< HEAD
    @Post('add')    
=======
    @Post('addCourse')
>>>>>>> 5962f595bef23cbc23f9675b5f5d8f7797ecf824
    addCourse(@GetUser('id') userId: number, @Body() dto: AddCourseDto){
        return this.courseService.addCourse(userId, dto);

    }

<<<<<<< HEAD
    @Patch('/:id')
=======
    @Patch('editCourse')
>>>>>>> 5962f595bef23cbc23f9675b5f5d8f7797ecf824
    editCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number, @Body() dto: EditCourseDto){
        return this.courseService.editCourseById(userId, courseId, dto);

    }

<<<<<<< HEAD
    @Delete('/:id')
=======
    @Delete('deleteCourse')
>>>>>>> 5962f595bef23cbc23f9675b5f5d8f7797ecf824
    removeCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
        return this.courseService.removeCourseById(userId, courseId);

    }

}
