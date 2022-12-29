/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface IOperation extends Document{
    readonly date: Date;
    readonly concept: string;
    readonly amount: number;
    readonly details: string;
    readonly location: string;
}