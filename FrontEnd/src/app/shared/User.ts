import { Account } from './Account';

export class User {
   _id?: string;
   name: string;
   surname1: string;
   surname2: string;
   email: string;
   password: string;
   accounts: Account[];
}
