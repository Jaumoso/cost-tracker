import { Injectable } from '@angular/core';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { USERS } from '../shared/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() { }

  getUsers(): User[] {
    return USERS;
  }

  getUser(id: string): User {
    return USERS.filter(user => (user.id === id))[0];
  }

  getUserAccounts(id: string): Account[] {
    return USERS.filter(user => (user.id === id))[0].accounts;
  }

  getAccountOperations(idUser: string, idAccount: string): Operation[] {
    return USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations;
  }

  addOperation(userId: string, accountId: string, operation: Operation) {
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].totalMoney += operation.amount;
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.push(operation);
    // USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(operation => console.log(operation));

  }
  recoverOperation(userId: string, accountId: string, operation: Operation) {
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].totalMoney -= operation.amount;
    const index = USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.indexOf(operation);
    if (index > -1) {
      USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.splice(index, 1);
    }
  }

  //funcion que te devuelve el primer id libre
  getMaxIdOper(userId: string, accountId: string): string {
    let maxId = '0';
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(oper => { if (oper.id > maxId) maxId = oper.id });
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(operation => console.log(operation.id));
    console.log((+maxId) + 1);
    return ((+maxId) + 1).toString();
  }
}
