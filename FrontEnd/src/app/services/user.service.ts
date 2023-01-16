import { Injectable } from '@angular/core';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { USERS } from '../shared/Users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() { }

  getUsers(): Observable<User[]> {
    return of(USERS)
      .pipe(
        delay(2000)
      );

    // getUsers(): Promise<User[]> { //returns promise
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS),2000); //promise with timers
    // })
    // return Promise.resolve(USERS); //promise without time delay
  }

  getUser(id: string): Observable<User> {
    return of(USERS.filter(user => user.id == id)[0])
      .pipe(
        // delay(2000) //no funciona con delay
      )
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS.filter(user => (user.id === id))[0]),2000);
    // })
    // return Promise.resolve(USERS.filter(user => (user.id === id))[0]);
  }

  getUserAccounts(id: string): Observable<Account[]> {
    return of(USERS.filter(user => (user.id === id))[0].accounts)
      .pipe(
        delay(2000)
      )
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS.filter(user => (user.id === id))[0].accounts),2000);
    // })
    // return Promise.resolve(USERS.filter(user => (user.id === id))[0].accounts);
  }

  getAccountOperations(idUser: string, idAccount: string): Observable<Operation[]> {
    return of(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations)
      .pipe(
        delay(2000)
      )
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations),2000);
    // })
    // return Promise.resolve(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations);
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
  getMaxIdOper(userId: string, accountId: string): Observable<string> {
    let maxId = '0';
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(oper => { if (oper.id > maxId) maxId = oper.id });
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(operation => console.log(operation.id));
    console.log((+maxId) + 1);
    
    return of(((+maxId) + 1).toString())
      .pipe(
        delay(2000)
      )
    
    // return new Promise(resolve => {
    //   setTimeout(()=>resolve(((+maxId) + 1).toString()),2000);
    // })
    // return Promise.resolve(((+maxId) + 1).toString());
  }

  getOperationsIds(userId: string, accountId: string): Observable<string []> {
    return of(USERS.filter(usuario=> usuario.id ==userId)[0].accounts.filter(account => account.id == accountId)[0].operations.map(operation => operation.id));
  }

  getOperation(userId: string, accountId: string, operationId: string): Observable<Operation> {
    return of(USERS.filter(usuario=> usuario.id ==userId)[0].accounts.filter(account => account.id == accountId)[0].operations.filter(operation => operation.id == operationId)[0]);
  }
}