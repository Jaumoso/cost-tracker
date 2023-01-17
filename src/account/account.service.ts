/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { IAccount } from 'src/account/interfaces/account.interface';
import { Model } from 'mongoose';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';

import { OperationService } from 'src/operation/operation.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private accountModel: Model<IAccount>,
    private operationService: OperationService,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
    const newAccount = await new this.accountModel(createAccountDto);
    return newAccount.save();
  }

  async updateAccount(
    accountId: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<IAccount> {
    const existingAccount = await this.accountModel.findByIdAndUpdate(
      accountId,
      updateAccountDto,
      { new: true },
    );
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
    const existingAccount = await this.accountModel.findById(accountId).populate('operations');
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

  async getTotalMoneyPerOperation(accountId: string) {
    const existingAccount = await this.accountModel.findById(accountId);
    if (!existingAccount) {
      throw new NotFoundException(`Account #${accountId} not found`);
    }

    const initialMoney = existingAccount.totalMoney;
    const operationIds: any = existingAccount.operations;
    /* console.log(operationIds); */
    const operationDocuments: any[] = await Promise.all(
      operationIds.map(async (id) =>
        this.operationService.getOperation(id.toString()),
      ),
    );
    /* console.log(operationDocuments[0].amount) */
    const operationMoney = [];

    operationMoney[0] = initialMoney + operationDocuments[0].amount;

    for (let i = 1; i < operationDocuments.length; i++) {
      operationMoney[i] = operationMoney[i - 1] + operationDocuments[i].amount;
    }
    return operationMoney;
  }

  async getMaxAndMinMoneyForAccount(accountId: string) {
    const existingAccount = await this.accountModel.findById(accountId);
    if (!existingAccount) {
      throw new NotFoundException(`Account #${accountId} not found`);
    }

    const operationMoney = await this.getTotalMoneyPerOperation(accountId);
    /* console.log(operationMoney); */

    const max = Math.max(...operationMoney);
    const min = Math.min(...operationMoney);

    /* Math.max.apply(null, operationMoney); */

    return [max, min];
  }

  // TODO: ACTUALENTE NO FUNCIONA
  async getOperationsByDate(
    accountId: string,
    dateString1: string,
    dateString2: string,
  ) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(23, 59, 59, 999);
    date1.toISOString();
    date2.toISOString();
    console.log('Date1: ' + date1);
    console.log('Date2: ' + date2);

    const operationData = await this.accountModel
      .find({
        _id: accountId,
        operations: {
          date: {
            $gte: date1,
            $lte: date2,
          },
        },
      })
      .populate('operations');
    console.log(operationData);

    if (!operationData || operationData.length == 0) {
      throw new NotFoundException('Operations data not found!');
    }
    return operationData;
  }
}
