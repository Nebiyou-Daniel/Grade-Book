import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto } from './dto';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2'
import { PrismaClient, User } from '@prisma/client';

export interface Grade {
    subject: string;
    score: string;
    credit: number;
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
          totalgrade += parseFloat(grade.score) * grade.credit;
          totalcredithours += grade.credit;
        }
        return totalgrade / totalcredithours;
      }

      async updateProfile(user:User, dto: ProfileUpdateDto){
        if(!user){throw new ForbiddenException('Not authenticated')}
        const returnObj=await this.prisma.user.update({
            where: {id: user.id},
            data:{ 
                fullName: dto.fullName,
                email: dto.Email,
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
        if(argon.verify(user.password,dto.oldPassword)){
                //insert the password
            const returnObj= await this.prisma.user.update({
                where:{id: user.id  },
                data:{password: pass}
            })
            delete returnObj.password
            //return object
            return returnObj
        }
        else throw new ForbiddenException('The old password is wrong')

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
            const returnObj=await this.prisma.grade.update({
              where:{id: 4},
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
                F:dto.D,
              }
            }
               
            )
            return returnObj
        }


      }


    }
