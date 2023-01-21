import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  /* IsNumber, */ IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Name of the user. This field is required.',
  })
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'First surname of the user. This field is optional.',
  })
  @IsString()
  @MaxLength(30)
  readonly surname1: string;

  @ApiProperty({
    type: String,
    description: 'Second surname of the user. This field is optional.',
  })
  @IsString()
  @MaxLength(30)
  readonly surname2?: string;

  @ApiProperty({ 
    type: String, 
    description: 'Email of the user. Required.',
    example: 'string@string.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  
  @ApiProperty({ 
    type: String, 
    description: 'Password of the user. Required.',
    example: 'string1234567890',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: [mongoose.Types.ObjectId],
    description: 'Array of type: ObjectId. Relation 1 user to many accounts.',
  })
  accounts: mongoose.Types.ObjectId[];
}
