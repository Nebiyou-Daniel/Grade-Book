import { IsNumber } from "class-validator"

export class GradeSystemUpdateDto{
    @IsNumber()
    A:number

    @IsNumber()
    Am:number

    @IsNumber()
    Bp:number

    @IsNumber()
    B:number

    @IsNumber()
    Bm:number

    @IsNumber()
    Cp:number

    @IsNumber()
    C:number

    @IsNumber()
    Cm:number

    @IsNumber()
    D:number

    @IsNumber()
    F:number
}