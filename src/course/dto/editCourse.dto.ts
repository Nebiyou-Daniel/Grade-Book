import { IsOptional, IsString } from "class-validator";

export class EditCourseDto{
    @IsOptional()
    @IsString()
    subject?: string;
    
    @IsOptional()
    @IsString()
    score?: string;

    @IsOptional()
    @IsString()
    credit?: string;
}
