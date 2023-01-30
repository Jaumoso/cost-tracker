import { Operation } from './Operation';

export class Account{
    _id?: string;
    name: string;
    totalMoney: number;
    operations: Operation[];
}
