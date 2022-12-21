/* eslint-disable prettier/prettier */
import { /* IsEmail, IsNotEmpty, */ IsNumber/* , IsString, MaxLength, MinLength */ } from "class-validator";
import mongoose from "mongoose";
export class CreateAccountDto {

    operations: mongoose.Types.ObjectId;
    
    @IsNumber()
    totalMoney: number;
}