import { IsString,IsNotEmpty } from "class-validator"
export class GradeSystemUpdateDto{
    @IsNotEmpty()
    A:string

    @IsNotEmpty()
    A_minus:string

    @IsNotEmpty()
    B_plus:string

    @IsNotEmpty()
    B:string

    @IsNotEmpty()
    B_minus:string

    @IsNotEmpty()
    C_plus:string

    @IsNotEmpty()
    C:string

    @IsNotEmpty()
    C_minus:string

    @IsNotEmpty()
    D:string

    @IsNotEmpty()
    F:string
}