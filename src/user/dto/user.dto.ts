
import { IsNotEmpty } from "class-validator";
import { IsString, IsNumber } from 'class-validator';

export class UserDto {
   
    @IsNotEmpty()
    @IsString()
    subject: string;
    
    @IsNotEmpty()
    @IsString()  
    score: string;
    
    @IsNotEmpty()
    @IsString()    
    credit: string;

}
