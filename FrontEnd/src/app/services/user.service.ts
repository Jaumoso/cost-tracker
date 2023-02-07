import { Injectable } from '@angular/core';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { USERS } from '../shared/Users';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  logged$ = new BehaviorSubject<boolean>(false);
  userId = null;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  addOperToAccount(acc: Account, oper: Operation): Account {
    acc.operations.push(oper);
    acc.totalMoney += oper.amount;

    return acc;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<{ userData: User[] }>(baseURL + 'user')
      .pipe(
        map(userData => userData.userData)
      ).pipe(catchError(this.processHTTPMsgService.handleError));
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
      ).pipe(catchError(this.processHTTPMsgService.handleError));

    // return of(USERS.filter(user => user._id == id)[0])//with observables
    //   .pipe(
    //     // delay(2000) //no funciona con delay
    //   )
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(USERS.filter(user => (user._id === id))[0]),2000);
    // })
    // return Promise.resolve(USERS.filter(user => (user._id === id))[0]);
  }








  getOperationsIds(accountId: string): Observable<string[]> {
    console.log("Account ID: ", accountId);
    return this.http.get<{ existingAccount: Account }>(baseURL + 'account/' + accountId)
      .pipe(
        map(acc => acc.existingAccount.operations.map(operation => operation._id))
      ).pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(USERS.filter(usuario=> usuario._id ==userId)[0].accounts.filter(account => account._id == accountId)[0].operations.map(operation => operation._id));//with observables
  }

  getOperation(userId: string, accountId: string, operationId: string): Observable<Operation> {
    return this.http.get<{ existingOperation: Operation }>(baseURL + 'operation/' + operationId)
      .pipe(
        map(oper => oper.existingOperation)
      ).pipe(catchError(this.processHTTPMsgService.handleError));

    // return of(USERS.filter(usuario=> usuario._id ==userId)[0].accounts.filter(account => account._id == accountId)[0].operations.filter(operation => operation._id == operationId)[0]);//with observables
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http.get<{ existingAccount: Account }>(baseURL + 'account/' + accountId)
      .pipe(
        map(acc => acc.existingAccount)
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // console.log("function getAccount",accountId);
    // return of(USERS.filter(usuario=> usuario._id ==userId)[0].accounts.filter(account => account._id == accountId)[0].operations.map(operation => operation._id));//with observables
  }


  //de J

  deleteOperation(operation: Operation): Observable<Operation> {
    return this.http.delete<Operation>(baseURL + 'operation/delete/' + operation._id)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  recoverOperation(userId: string, accountId: string, operation: Operation) {
    USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].totalMoney -= operation.amount;
    const index = USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.indexOf(operation);
    if (index > -1) {
      USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.splice(index, 1);
    }
  }

  setLogged(logged: boolean) {
    // this.logged=logged;
    this.logged$.next(logged);
    const accessToken = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);
    console.log("decodedToken: ", decodedToken.sub);
    this.userId=decodedToken.sub;
  }

  public getuserId() {
    return this.userId;
  }

  getLogged(): boolean {
    // return this.logged;
    return this.logged$.getValue();

  }

  //j edited and modified 

  createOperation(operation: Operation): Observable<Operation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<{ newOperation: Operation }>(baseURL + 'operation/', operation, httpOptions)
      .pipe(map(oper => oper.newOperation))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  editAccount(account: Account): Observable<Account> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log("function editAccount: ", account);
    return this.http.put<{ existingAccount: Account }>(baseURL + 'account/' + account._id, account, httpOptions)
      .pipe(map(acc => acc.existingAccount))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  editOperation(operation: Operation): Observable<Operation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log("inside function",operation);
    return this.http.put<{ operationData: Operation }>(baseURL + 'operation/new/' + operation._id, operation, httpOptions)
      .pipe(map(oper => oper.operationData))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  editUser(usuario: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log("function editUser: ", usuario);
    return this.http.put<{ existingUser: User }>(baseURL + 'user/' + usuario._id, usuario, httpOptions)
      .pipe(map(user => user.existingUser))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }



}

 // getUserAccounts(id: string): Observable<Account[]> {
  //   return this.http.get<{ existingUser: User}>(baseURL+'user/' + id)
  //   .pipe(
  //     map(userData => userData.existingUser.accounts)
  //   );

  //   // return of(USERS.filter(user => (user._id === id))[0].accounts)//with observables
  //   //   .pipe(
  //   //     delay(2000)
  //   //   )
  //   // return new Promise(resolve => {
  //   //   setTimeout(()=> resolve(USERS.filter(user => (user._id === id))[0].accounts),2000);
  //   // })
  //   // return Promise.resolve(USERS.filter(user => (user._id === id))[0].accounts);
  // }

  // getAccountOperations(idUser: string, idAccount: string): Observable<Operation[]> {
  //   return of(USERS.filter(user => (user._id === idUser))[0].accounts.filter(account => account._id === idAccount)[0].operations)
  //     .pipe(
  //       delay(2000)
  //     )//with observables
  //   // return new Promise(resolve => {
  //   //   setTimeout(()=> resolve(USERS.filter(user => (user._id === idUser))[0].accounts.filter(account => account._id === idAccount)[0].operations),2000);
  //   // })
  //   // return Promise.resolve(USERS.filter(user => (user._id === idUser))[0].accounts.filter(account => account._id === idAccount)[0].operations);
  // }
    // createOperation(user: User): Observable<User> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put<User>(baseURL + 'user/' + user._id, user, httpOptions);
  //   // .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  //funcion que te devuelve el primer id libre
//   getMaxIdOper(userId: string, accountId: string): Observable<string> {
//     let maxId = '0';
//     USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.forEach(oper => { if (oper._id > maxId) maxId = oper._id });
//     USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.forEach(operation => console.log(operation._id));
//     console.log((+maxId) + 1);

//     return of(((+maxId) + 1).toString())//with observables
//       .pipe(
//         delay(2000)
//       )

//     // return new Promise(resolve => {
//     //   setTimeout(()=>resolve(((+maxId) + 1).toString()),2000);
//     // })
//     // return Promise.resolve(((+maxId) + 1).toString());
//   }
// addOperation(userId: string, accountId: string, operation: Operation) {
// USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].totalMoney += operation.amount;
// USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.push(operation);
// // USERS.filter(user => (user._id === userId))[0].accounts.filter(account => account._id === accountId)[0].operations.forEach(operation => console.log(operation));

// }