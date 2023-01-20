import mongoose, { Document } from 'mongoose';
export interface IUser extends Document{
    readonly name: string;
    readonly surname1: string;
    readonly surname2?: string;
    readonly email: string;
    readonly password: string;
    readonly accounts: mongoose.Types.ObjectId[];
}