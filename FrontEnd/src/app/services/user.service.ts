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

  getUsers(): User[]{
    return USERS;
  }

  getUser(id:string): User{
    return USERS.filter(user => (user.id === id))[0];
  }

  getUserAccounts(id:string): Account[]{
    return USERS.filter(user => (user.id === id))[0].accounts;
  }

  getAccountOperations(idUser:string, idAccount:string): Operation[]{
    return USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations;
  }
}
