import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ProfileUpdateDto{
    @IsOptional()
    @IsString()
    fullName?:string
    
    @IsString()
    universityName?:string

    @IsOptional()
    @IsEmail()
    Email?:string
}
