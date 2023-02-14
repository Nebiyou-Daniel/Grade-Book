import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto } from './dto';
import * as argon from 'argon2'
import {  User } from '@prisma/client';

export interface Grade {
    subject: string;
    score: string;
    credit: string;
  }
  
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  
  async getGradingSystem(userId: number){
    return this.prisma.grade.findMany({
      where: {
        userId
      }
    })
  }
  async updateProfile(user:User, dto: ProfileUpdateDto){
    if(!user){
      throw new ForbiddenException('Not authenticated')
    }
    const returnObj=await this.prisma.user.update({
        where: {id: user.id},
        data:{ 
            fullName: dto.fullName,
            universityName: dto.universityName
        }
    }) 
    delete returnObj.password
    return returnObj

    
  }

  async updatePassword(user: User, dto:PasswordUpdateDto){
    if(!user){
      throw new ForbiddenException('Not authenticated')
    }
    const pass: string=await argon.hash(dto.newPassword)
    //verify if password is correct
    const use=await this.prisma.user.findFirst({
      where:{id: user.id}
  })
    const correct=await argon.verify(use.password,dto.oldPassword)
    if(correct){
            //insert the password
        const returnObj= await this.prisma.user.update({
            where:{id: user.id  },
            data:{password: pass}
        })
        delete returnObj.password
        //return object
        return returnObj
    }
    else throw new ForbiddenException('Old password is wrong')

  }

  async updateGradingSystem(userId: number, dto:GradeSystemUpdateDto){
    
    const gradingSys = await this.prisma.grade.findUnique({
      where: {
        userId: userId,
      }
    })
   
    if (!gradingSys){
      await this.prisma.grade.create({data:{
        userId,
        A : "4.0",
        A_minus: "3.75",
        B_plus: "3.5",
        B : "3.25",
        B_minus: "3.0",
        C_plus : "2.75",
        C      : "2.5",
        C_minus: "2.0",
        D      : "1.75",
        F      : "1.50",
      }})
      }
      return this.prisma.grade.update({
        where: {
          userId: userId,
        },
        data: {
          ...dto,
        }
      })

    }
    
  }
