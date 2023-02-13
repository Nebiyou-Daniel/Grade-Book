import { IsOptional, IsString } from "class-validator";

export class EditCourseDto{
    @IsOptional()
    @IsString()
    courseName?: string;
    
    @IsOptional()
    @IsString()
    score?: string;

    @IsOptional()
    @IsString()
    credit?: string;
}
