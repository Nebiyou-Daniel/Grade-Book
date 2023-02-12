import { IsString } from "class-validator";
import { IsEmail, IsNotEmpty } from "class-validator";


export class AuthDtoSignUp{

    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @IsEmail()    
    email: string;
    
    @IsNotEmpty()
    @IsString()    
    password: string;
}

export class AuthDtoLogIn{

    @IsNotEmpty()
    @IsEmail()    
    email: string;
    
    @IsNotEmpty()
    @IsString()    
    password: string;
}
