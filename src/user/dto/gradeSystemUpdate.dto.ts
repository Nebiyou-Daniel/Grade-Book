import { IsOptional, IsString } from "class-validator"
export class GradeSystemUpdateDto{
    @IsOptional()
    @IsString()
    A_plus?:string

    @IsOptional()
    @IsString()
    A?:string

    @IsOptional()
    @IsString()
    A_minus?:string

    @IsOptional()
    @IsString()
    B_plus?:string

    @IsOptional()
    @IsString()
    B?:string

    @IsOptional()
    @IsString()
    B_minus?:string

    @IsOptional()
    @IsString()
    C_plus?:string

    @IsOptional()
    @IsString()
    C?:string

    @IsOptional()
    @IsString()
    C_minus?:string

    @IsOptional()
    @IsString()
    D?:string

    @IsOptional()
    @IsString()
    F?:string
}
