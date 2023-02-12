import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ProfileUpdateDto{
    @IsNotEmpty()
    @IsString()
    fullName:string
    
    @IsNotEmpty()
    @IsString()
    universityName:string

    @IsNotEmpty()
    @IsEmail()
    Email:string
}