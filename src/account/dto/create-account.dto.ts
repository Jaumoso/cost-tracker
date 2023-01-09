/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { /* IsEmail, IsNotEmpty, */ IsNumber , IsString, /* MaxLength, MinLength */ } from "class-validator";
import mongoose from "mongoose";
export class CreateAccountDto {

    @ApiProperty({
        type: String, 
        description: 'Name of the account. Every user can have multiple accounts, with different names or plans.',
        example: 'default name'
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number, 
        description: 'Total account money. This is to calculate variation of money over time, and serves as point of reference.',
        example: 100
    })
    @IsNumber()
    totalMoney: number;

    @ApiProperty({
        type: [mongoose.Types.ObjectId], 
        description: 'Array of type: ObjectId. Relation 1 account to many operations.',
        example: [new mongoose.Types.ObjectId()]
    })
    operations: mongoose.Types.ObjectId[];
}