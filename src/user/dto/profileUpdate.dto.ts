import { IsOptional, IsString } from "class-validator"

export class ProfileUpdateDto{
    @IsOptional()
    @IsString()
    fullName?:string
    
    @IsOptional()
    @IsString()
    universityName?:string

    @IsOptional()
    @IsString()
    studyLevel?:string
}
