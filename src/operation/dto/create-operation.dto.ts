/* eslint-disable prettier/prettier */
import { /* IsEmail, */ IsNotEmpty, IsNumber, IsString, /* ,  MaxLength, MinLength */ } from "class-validator";
import mongoose from "mongoose";
export class CreateOperationDto {

    operations: mongoose.Types.ObjectId;
    @IsNotEmpty()
    date: Date;
    @IsString()
    @IsNotEmpty()
    concept: string;
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}