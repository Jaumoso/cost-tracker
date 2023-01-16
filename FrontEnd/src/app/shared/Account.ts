import { Operation } from './Operation';

export class Account{    
    id: string;
    name: string;
    totalMoney: number;
    operations: Operation[];
}