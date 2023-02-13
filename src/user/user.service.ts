import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto } from './dto';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2'
import { PrismaClient, User } from '@prisma/client';

export interface Grade {
    subject: string;
    score: string;
    credit: string;
  }
  
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    private grades: Grade[] = [];
    
    insert(userDto: UserDto): Grade {
        const grade: Grade = {
          subject: userDto.subject,
          score: userDto.score,
          credit: userDto.credit,
        };
        this.grades.push(grade);
        return grade;
      }
    
      getAll(): Grade[] {
        return this.grades;
      }
    
      calculateCGPA(): number {
        let totalgrade = 0;
        let totalcredithours = 0;
        for (const grade of this.grades) {
          totalgrade += parseFloat(grade.score) * parseInt(grade.credit);
          totalcredithours += parseInt(grade.credit);
        }
        return totalgrade / totalcredithours;
      }

      async updateProfile(user:User, dto: ProfileUpdateDto){
        if(!user){
          throw new ForbiddenException('Not authenticated')
        }
        const returnObj=await this.prisma.user.update({
            where: {id: user.id},
            data:{ 
                fullName: dto.fullName,
                email: dto.Email,
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

      async updateGradingSystem(user: User, dto:GradeSystemUpdateDto){
        if(!user){
          throw new ForbiddenException('Not authenticated')
        }
        let keys=Object.keys(dto)
        let valid=true
        let key:string
        for(let i=0;i<keys.length-1;i++){
            key=keys[i]
            let nextKey=keys[i+1]
            if(Number(dto[key])<Number(dto[nextKey])){
                valid=false
                break
            }  
        }

        if(valid){
            const gradeSys=await this.prisma.grade.findUnique({
              where:{
                id:user.id,
              }
            })
            if(gradeSys){
              const returnObj=await this.prisma.grade.update({
                where:{
                  id: user.id
                },
                data:{
                  A:dto.A,
                  A_minus:dto.A_minus,
                  B_plus:dto.B_plus,
                  B:dto.B ,
                  B_minus:dto.B_minus,
                  C_plus:dto.C_plus,
                  C:dto.C,
                  C_minus:dto.C_minus,
                  D:dto.D,
                  F:dto.F,
                }
              })
              return returnObj
            }
            else {
              const returnObj=await this.prisma.grade.create({
                data:{
                  userId:user.id,
                  A:dto.A,
                  A_minus:dto.A_minus,
                  B_plus:dto.B_plus,
                  B:dto.B ,
                  B_minus:dto.B_minus,
                  C_plus:dto.C_plus,
                  C:dto.C,
                  C_minus:dto.C_minus,
                  D:dto.D,
                  F:dto.F,
                }
              })
              return returnObj
            }
      
        }
        else return {error:'Check order of grades again'}
      }
    }
