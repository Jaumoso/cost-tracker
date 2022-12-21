/* eslint-disable prettier/prettier */
import mongoose, { Document } from 'mongoose';
export interface IAccount extends Document{
    readonly totalMoney: number;
    readonly operations: mongoose.Types.ObjectId[];
}