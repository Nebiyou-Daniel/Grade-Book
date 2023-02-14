import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
                    studyLevel: dto.studyLevel,
                    password,
                }
            })

            // return the saved user
            return this.signToken(user.id, user.email);            
        }catch (error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new HttpException({
                        status: HttpStatus.BAD_REQUEST,
                        error: "Email Already Taken.",
                      }, 400);
                }
            }
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "An error has occured, Try again",
              }, 400);
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
        if(!user) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "Your email is incorrect",
          }, 400);

        //compare password
        const pwMatches = await argon.verify(user.password, dto.password);

        //if password is incorrect throw exception
        if(!pwMatches) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: `Your Password is Incorrect.`,
          }, 400);

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
            expiresIn: '120m',
            secret: secret,
         },
        );
        return {
            access_token: token,
        }
    }
}
