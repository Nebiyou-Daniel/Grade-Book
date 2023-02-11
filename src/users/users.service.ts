import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { GradeSystemUpdateDto, PasswordUpdateDto, ProfileUpdateDto} from './dto'
import * as argon from 'argon2'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService){}
    async updatePassword(Id: number,dto: PasswordUpdateDto){
        const user=await this.prismaService.user.findUnique({where:{id: Id}})
        if(!user){
            throw new ForbiddenException('No user found with matching credential')
        }
        const pass: string=await argon.hash(dto.newPassword)
        //verify if password is correct
        if(argon.verify(user.password,dto.oldPassword)){
                //insert the password
            const returnObj= await this.prismaService.user.update({
                where:{id: Id},
                data:{password: pass}
            })
            delete returnObj.password
            //return object
            return returnObj
        }
        else throw new ForbiddenException('The old password is wrong')
    }
    
    async updateProfile(Id: number, dto: ProfileUpdateDto){
        const user=await this.prismaService.user.findUnique({
            where:{id: Id}
        })
        if(!user){throw new ForbiddenException('No user with matching credentials is found')}
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
        let gradeSys=await this.prismaService.gradeSystem.findUnique({
            where: {userId: Id}
        })
        if(!gradeSys){
            let returnObj=await this.prismaService.gradeSystem.create({
                data:{
                    A: dto.A,
                    Am: dto.Am,
                    Bp: dto.Bp,
                    B: dto.B,
                    Bm: dto.Bm,
                    Cp: dto.Cp,
                    C: dto.C,
                    Cm: dto.Cm,
                    D: dto.D,
                    F: dto.F,
                    userId: Id
                }
            })
            return returnObj
        }
        else{
            let keys=Object.keys(dto)
            let valid=true
            let key:string
            for(let i=0;i<keys.length-1;i++){
                key=keys[i]
                let nextKey=keys[i+1]
                if(dto[key]<dto[nextKey]){
                    valid=false
                    break
                }  
            }
            if(valid){
                const returnObj=await this.prismaService.gradeSystem.update({
                    where:{userId: Id},
                    data:{
                        A: dto.A,
                        Am: dto.Am,
                        Bp: dto.Bp,
                        B: dto.B,
                        Bm: dto.Bm,
                        Cp: dto.Cp,
                        C: dto.C,
                        Cm: dto.Cm,
                        D: dto.D,
                        F: dto.F,
                    }
                })
                return returnObj
            }
            return {errorKey: key}
        }
    }     
}
