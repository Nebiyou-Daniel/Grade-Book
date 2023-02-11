import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { Prisma } from "@prisma/client";
import * as argon from 'argon2';
// import argon2 

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async signup(dto: AuthDto){

        // generate a password hash
        const password = await argon.hash(dto.password);
        try{
            // save the new user in the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    fullName: dto.fullName,
                    password,
                }
            })
            delete user.password;

            // return the saved user
            return user;            
        }catch (error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException(`the ${error.meta.target} credential has been taken`)
                }
            }
            throw error

        }


    }
    async login(dto: AuthDto){

        //find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        //if user doesn't exist throw exception
        if(!user) throw new ForbiddenException('Your email is incorrect');

        //compare password
        const pwMatches = await argon.verify(user.password, dto.password);

        //if password is incorrect throw exception
        if(!pwMatches) throw new ForbiddenException('Your password is incorrect');

        //return the user

        delete user.password;
        return user;
    }
}
