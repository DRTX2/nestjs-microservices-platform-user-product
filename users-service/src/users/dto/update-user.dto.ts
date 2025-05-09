import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @MinLength(3)
    username:string;
    
    @IsOptional()
    @IsEmail()
    email:string;
}