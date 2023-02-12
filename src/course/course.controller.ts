import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';;
import { ParseIntPipe } from '@nestjs/common/pipes';
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

    @Get('getCourse')
    getcourseByName(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){
        return this.courseService.getCourseById(userId, courseId);

    }

    @Post('addCourse')
    addCourse(@GetUser('id') userId: number, @Body() dto: AddCourseDto){
        return this.courseService.addCourse(userId, dto);

    }

    @Patch('editCourse')
    editCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number, @Body() dto: EditCourseDto){
        return this.courseService.editCourseById(userId, courseId, dto);

    }

    @Delete('deleteCourse')
    removeCourseById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) courseId: number){

    }

}
