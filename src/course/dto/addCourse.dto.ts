import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddCourseDto{
    @IsNotEmpty()
    @IsString()
    courseName: string;

    @IsNotEmpty()
    @IsString()
    score: string;

    @IsNotEmpty()
    @IsString()
    credit: string;

    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsString()
    semester: string;
}


