import { IsString,IsNotEmpty, IsOptional } from "class-validator"
export class GradeSystemUpdateDto{
    @IsOptional()
    A?:string

    @IsOptional()
    A_minus?:string

    @IsOptional()
    B_plus?:string

    @IsOptional()
    B?:string

    @IsOptional()
    B_minus?:string

    @IsOptional()
    C_plus?:string

    @IsOptional()
    C?:string

    @IsOptional()
    C_minus?:string

    @IsOptional()
    D?:string

    @IsOptional()
    F?:string
}
