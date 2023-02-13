import { Injectable } from '@nestjs/common';
import { AddCourseDto, EditCourseDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService){}

    getCourse(userId: number){
      return this.prisma.course.findMany({
        where: {
          userId
        }
      })
    }

    getCourseById(userId: number, courseId: number){
      return this.prisma.course.findFirst({
        where: {
          userId,
          id: courseId,
        }
      })
    }

    async addCourse(userId: number, dto: AddCourseDto){
      const course = await this.prisma.course.create({
        data: {
          userId,
          ...dto,
        }
      })

      return course;
    }

    async editCourseById(userId: number, courseId: number, dto: EditCourseDto){
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
        }
      })
      if (!course || course.userId !== userId){
        throw new ForbiddenException('Access to edit denied')
      }
      return this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          ...dto,
        }
      })
    }

    async removeCourseById(userId: number, courseId: number){
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
        }
      })
      if (!course || course.userId !== userId){
        throw new ForbiddenException('Access to edit denied')
      }
      return this.prisma.course.delete({
        where: {
          id: courseId,
        }
      })   
    }

}
