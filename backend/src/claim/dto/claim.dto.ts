import { IsInt, IsString, MinLength } from "class-validator";


export class ClaimDto {
    @IsString()
    userId: string

    @IsInt()
    @MinLength(1)
    points: number
}