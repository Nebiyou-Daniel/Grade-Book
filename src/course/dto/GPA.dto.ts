import { IsNotEmpty, IsString } from "class-validator";

export class GPADto{
    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsString()
    semester: string;
}
