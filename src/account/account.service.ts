/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { IAccount } from 'src/account/interfaces/account.interface';
import { Model } from "mongoose";
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
@Injectable()
export class AccountService {
  
constructor(@InjectModel('Account') private accountModel:Model<IAccount>) { }

async createAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
   const newAccount = await new this.accountModel(createAccountDto);
   return newAccount.save();
}
async updateAccount(accountId: string, updateAccountDto: UpdateAccountDto): Promise<IAccount> {
    const existingAccount = await this.accountModel.findByIdAndUpdate(accountId, updateAccountDto, { new: true });
   if (!existingAccount) {
     throw new NotFoundException(`Account #${accountId} not found`);
   }
   return existingAccount;
}
async getAllAccounts(): Promise<IAccount[]> {
    const accountData = await this.accountModel.find().populate('operations'); // TODO: cuidadito con esto
    if (!accountData || accountData.length == 0) {
        throw new NotFoundException('Accounts data not found!');
    }
    return accountData;
}
async getAccount(accountId: string): Promise<IAccount> {
   const existingAccount = await     this.accountModel.findById(accountId).exec();
   if (!existingAccount) {
    throw new NotFoundException(`Account #${accountId} not found`);
   }
   return existingAccount;
}
async deleteAccount(accountId: string): Promise<IAccount> {
    const deletedAccount = await this.accountModel.findByIdAndDelete(accountId);
   if (!deletedAccount) {
     throw new NotFoundException(`Account #${accountId} not found`);
   }
   return deletedAccount;
}
}