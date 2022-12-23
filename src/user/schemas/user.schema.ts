/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Account } from "src/account/schemas/account.schema";
@Schema()
export class User {

   @Prop()
   name: string;

   @Prop()
   surname1: string;

   @Prop()
   surname2: string;

   @Prop()
   email: string;

   @Prop()
   password: string;

   @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]})
   accounts: Account[];
}
export const UserSchema = SchemaFactory.createForClass(User);