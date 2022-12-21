/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Operation } from "src/operation/schemas/operation.schema";
@Schema()
export class Account {
    @Prop()
    totalMoney: number;
    
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Operation'}]})
    operations: Operation[];
}
export const AccountSchema = SchemaFactory.createForClass(Account);