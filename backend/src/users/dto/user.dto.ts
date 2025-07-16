import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string
}