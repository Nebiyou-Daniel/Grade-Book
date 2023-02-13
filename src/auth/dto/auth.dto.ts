import { IsOptional, IsString } from "class-validator";
import { IsEmail, IsNotEmpty } from "class-validator";


export class AuthDtoSignup{

    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @IsEmail()    
    email: string;
    
    @IsNotEmpty()
    @IsString()    
    password: string;

<<<<<<< HEAD
=======

>>>>>>> 5962f595bef23cbc23f9675b5f5d8f7797ecf824
    @IsOptional()
    @IsString()
    universityName: string;
}
export class AuthDtoLogin{

    
    @IsNotEmpty()
    @IsEmail()    
    email: string;
    
    @IsNotEmpty()
    @IsString()    
    password: string;
}
