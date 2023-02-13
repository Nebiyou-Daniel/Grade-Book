import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtoLogin, AuthDtoSignup } from './dto';
import { Prisma } from "@prisma/client";
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';


// import argon2 

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}
    async signup(dto: AuthDtoSignup){

        // generate a password hash
        const password = await argon.hash(dto.password);
        try{
            // save the new user in the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    fullName: dto.fullName,
                    universityName: dto.universityName,
                    password,
                    universityName:"AAU"
                }
            })

            // return the saved user
            return this.signToken(user.id, user.email);            
        }catch (error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException(`this ${error.meta.target} credential has been taken`)
                }
            }
            throw error

        }


    }
    async login(dto: AuthDtoLogin){

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

        
        return this.signToken(user.id, user.email);
    }
    async signToken(
        userId: number,
        email: string,
    ): Promise <{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '45m',
            secret: secret,
         },
        );
        return {
            access_token: token,
        }
    }
}
