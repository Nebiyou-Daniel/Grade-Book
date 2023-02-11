import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto} from './dto'
import * as argon from 'argon2'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService){}
    async updatePassword(Id: number,dto: PasswordUpdateDto){
        const user=await this.prismaService.user.findUnique({where:{id: Id}})
        const pass: string=await argon.hash(dto.newPassword)
        console.log(dto)
        //verify if password is correct
        if(argon.verify(user.password,dto.oldPassword)){
            //verify if confirm password and new password are the same
            if(dto.confirmPassword==dto.newPassword){
                //insert the password
                const returnObj= await this.prismaService.user.update({
                    where:{id: Id},
                    data:{password: pass}
                 })
            delete returnObj.password
            //return object
            return returnObj
            }
        }
    }
    
    async updateProfile(Id: number, dto: ProfileUpdateDto){
        const returnObj=await this.prismaService.user.update({
            where: {id: Id},
            data:{ 
                fullName: dto.fullName,
                email: dto.Email,
            }
        }) 
        delete returnObj.password
        return returnObj

    }

    async updateGradingSystem(Id: number, dto:GradeSystemUpdateDto){
        //database doesn't exist
    }
}
