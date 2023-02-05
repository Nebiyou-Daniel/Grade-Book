import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

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
    }
