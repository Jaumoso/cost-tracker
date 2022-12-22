/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { /* IsEmail, */ IsNotEmpty, IsNumber, IsString, /* ,  MaxLength, MinLength */ } from "class-validator";
export class CreateOperationDto {

    @ApiProperty({type: Date, description: 'Date in which the operation was made.'})
    @IsNotEmpty()
    date: Date;

    @ApiProperty({type: String, description: 'Concept of the operation. A brief description of the income or expense.'})
    @IsString()
    @IsNotEmpty()
    concept: string;

    @ApiProperty({type: Number, description: 'Cost or income of the operation.'})
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}