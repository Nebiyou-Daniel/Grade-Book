import { IsString } from "class-validator";
import { IsEmail, IsNotEmpty } from "class-validator";


export class AuthDto{

    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @IsEmail()    
    email: string;
    
    @IsNotEmpty()
    @IsString()    
    password: string;

    @IsNotEmpty()
    @IsString()    
    universityName: string;
}
