/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, /* IsNumber, */ IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";
export class CreateUserDto {

    account: mongoose.Types.ObjectId;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(30)
    readonly surname1: string;

    @IsString()
    @MaxLength(30)
    readonly surname2: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    
    @MinLength(8)
    @IsNotEmpty()
    readonly password: string;
}