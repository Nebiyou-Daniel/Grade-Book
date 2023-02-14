import { Injectable } from '@nestjs/common';
import { AddCourseDto, EditCourseDto, GPADto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { ParseFloatPipe } from '@nestjs/common/pipes';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService){}

// get All courses that belong to a certain user

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
// Get the CGPA done for all courses in mind

    async getCGPA(userId: number){
      const courses = this.getCourse(userId);
      let sumTotal = 0;
      let sumOfCredits = 0;
      for (const course of await courses) {
        let temp1 = Number(course['score']) * Number(course['credit'])
        let temp2 = Number(course['credit'])
        sumTotal += Number(temp1)
        sumOfCredits += Number(temp2)
        
      }
      return (sumTotal/sumOfCredits).toFixed(2);
    }

// get GPA of certain year and semester

    async getGPA(userId: number, dto: GPADto){
      const courses = this.getCourse(userId)
      let sumTotal = 0;
      let sumOfCredits = 0;
      for (const course of await courses){

        if (Number(dto.year) === Number(course['year']) && Number(dto.semester) === Number(course['semester'])){

          let temp1 = Number(course['score']) * Number(course['credit'])
          let temp2 = Number(course['credit'])
          sumTotal += Number(temp1)
          sumOfCredits += Number(temp2)

        } else {
          continue
        }
      } if (sumOfCredits === 0){
        return `NO COURSES`;
      }
      return (sumTotal/sumOfCredits).toFixed(2);
    }
// get the individual GPA of different years and semsters and return them as an array of objects

    async getAllGPA(userId: number){
      let AllGpa= {}
      for (let year = 1; year < 6; year++){

        for (let semester = 1; semester < 3; semester++){
          let dto = {year: String(Number(year)), semester: String(Number(semester))}
     
          AllGpa[`${year}${semester}`] = await this.getGPA(userId, dto)
        }
      }
      return AllGpa;
    }
// add a new course by giving it course name, your score and the credit for that score

    async addCourse(userId: number, dto: AddCourseDto){
      const course = await this.prisma.course.create({
        data: {
          userId,
          ...dto,
        }
      })

      return course;
    }
// edit a certain course 

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
// delete a certain course from the database

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
