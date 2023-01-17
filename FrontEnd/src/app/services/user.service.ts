import { Injectable } from '@angular/core';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { USERS } from '../shared/Users';
import { Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<{ userData: User[] }>(baseURL + 'user')
      .pipe(
        map(userData => userData.userData)
      );
    // return of(USERS)  //with observables
    //   .pipe(
    //     delay(2000)
    //   );

    // getUsers(): Promise<User[]> { //returns promise
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS),2000); //promise with timers
    // })
    // return Promise.resolve(USERS); //promise without time delay
  }

  getUser(id: string): Observable<User> {
    return this.http.get<{ existingUser: User }>(baseURL + 'user/' + id)
      .pipe(
        map(userData => userData.existingUser)
      );

    // return of(USERS.filter(user => user.id == id)[0])//with observables
    //   .pipe(
    //     // delay(2000) //no funciona con delay
    //   )
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS.filter(user => (user.id === id))[0]),2000);
    // })
    // return Promise.resolve(USERS.filter(user => (user.id === id))[0]);
  }

  // getUserAccounts(id: string): Observable<Account[]> {
  //   return this.http.get<{ existingUser: User}>(baseURL+'user/' + id)
  //   .pipe(
  //     map(userData => userData.existingUser.accounts)
  //   );

  //   // return of(USERS.filter(user => (user.id === id))[0].accounts)//with observables
  //   //   .pipe(
  //   //     delay(2000)
  //   //   )
  //   // return new Promise(resolve => {
  //   //   setTimeout(()=> resolve(USERS.filter(user => (user.id === id))[0].accounts),2000);
  //   // })
  //   // return Promise.resolve(USERS.filter(user => (user.id === id))[0].accounts);
  // }

  // getAccountOperations(idUser: string, idAccount: string): Observable<Operation[]> {
  //   return of(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations)
  //     .pipe(
  //       delay(2000)
  //     )//with observables
  //   // return new Promise(resolve => {
  //   //   setTimeout(()=> resolve(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations),2000);
  //   // })
  //   // return Promise.resolve(USERS.filter(user => (user.id === idUser))[0].accounts.filter(account => account.id === idAccount)[0].operations);
  // }

  
  //funcion que te devuelve el primer id libre
  getMaxIdOper(userId: string, accountId: string): Observable<string> {
    let maxId = '0';
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(oper => { if (oper.id > maxId) maxId = oper.id });
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(operation => console.log(operation.id));
    console.log((+maxId) + 1);

    return of(((+maxId) + 1).toString())//with observables
      .pipe(
        delay(2000)
      )

    // return new Promise(resolve => {
    //   setTimeout(()=>resolve(((+maxId) + 1).toString()),2000);
    // })
    // return Promise.resolve(((+maxId) + 1).toString());
  }



  getOperationsIds(accountId: string): Observable<string[]> {
    console.log(accountId);
    return this.http.get<{ existingAccount: Account }>(baseURL + 'account/' + accountId)
      .pipe(
        map(acc => acc.existingAccount.operations.map(operation => operation._id))
      );
    // return of(USERS.filter(usuario=> usuario.id ==userId)[0].accounts.filter(account => account.id == accountId)[0].operations.map(operation => operation.id));//with observables
  }

  getOperation(userId: string, accountId: string, operationId: string): Observable<Operation> {
    return this.http.get<{ existingOperation: Operation }>(baseURL + 'operation/' + operationId)
      .pipe(
        map(oper => oper.existingOperation)
      );

    // return of(USERS.filter(usuario=> usuario.id ==userId)[0].accounts.filter(account => account.id == accountId)[0].operations.filter(operation => operation.id == operationId)[0]);//with observables
  }

  createOperation(operation: Operation): Observable<Operation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Operation>(baseURL + 'operation/new/' + operation.id, operation, httpOptions);
    // .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  addOperation(userId: string, accountId: string, operation: Operation) {
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].totalMoney += operation.amount;
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.push(operation);
    // USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.forEach(operation => console.log(operation));

  }
  deleteOperation(id: string): Observable<Operation> {
    return this.http.delete<Operation>(baseURL + 'operation/delete/' + id);
      // .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  recoverOperation(userId: string, accountId: string, operation: Operation) {
    USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].totalMoney -= operation.amount;
    const index = USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.indexOf(operation);
    if (index > -1) {
      USERS.filter(user => (user.id === userId))[0].accounts.filter(account => account.id === accountId)[0].operations.splice(index, 1);
    }
  }



  editOperation(operation: Operation): Observable<Operation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Operation>(baseURL + 'operation/edit/' + operation.id, operation, httpOptions);
      // .pipe(catchError(this.processHTTPMsgService.handleError));

  }



}