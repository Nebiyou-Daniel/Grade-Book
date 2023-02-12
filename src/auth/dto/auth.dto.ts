import { IsString } from "class-validator";
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
