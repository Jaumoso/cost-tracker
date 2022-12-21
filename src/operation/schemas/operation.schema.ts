/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Operation {
   @Prop()
    date: Date;
    @Prop()
    concept: string;
    @Prop()
    amount: number;
}
export const OperationSchema = SchemaFactory.createForClass(Operation);