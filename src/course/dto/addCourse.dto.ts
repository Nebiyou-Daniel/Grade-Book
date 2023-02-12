import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddCourseDto{
    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    score: string;

    @IsNotEmpty()
    @IsString()
    credit: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsNumber()
    semester: number;
}


