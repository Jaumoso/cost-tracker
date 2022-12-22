/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, /* IsNumber, */ IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";
export class CreateUserDto {

    @ApiProperty({type: String, description: 'Name of the user. This field is required.'})
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({type: String, description: 'First surname of the user. This field is optional.'})
    @IsString()
    @MaxLength(30)
    readonly surname1: string;

    @ApiProperty({type: String, description: 'Second surname of the user. This field is optional.'})
    @IsString()
    @MaxLength(30)
    readonly surname2: string;

    @ApiProperty({type: String, description: 'Email of the user. Required.'})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    
    @ApiProperty({type: String, description: 'Password of the user. Required.'})
    @MinLength(8)
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({type: mongoose.Types.ObjectId, description: 'Type: ObjectId. Relation 1 to 1 with Account'})
    account: mongoose.Types.ObjectId;
}