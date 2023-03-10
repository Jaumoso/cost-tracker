/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { /* IsEmail, */ IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, /* ,  MaxLength, MinLength */ } from "class-validator";
export class CreateOperationDto {

    @ApiProperty({type: Date, description: 'Date in which the operation was made.'})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({type: String, description: 'Concept of the operation. A brief description of the income or expense.'})
    @IsString()
    @IsNotEmpty()
    concept: string;

    @ApiProperty({type: Number, description: 'Cost or income of the operation.'})
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({type: String, description: 'Extended description of the operation. OPTIONAL'})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    details?: string;

    @ApiProperty({type: String, description: 'Location in which the operation was made. OPTIONAL'})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    location?: string;
}