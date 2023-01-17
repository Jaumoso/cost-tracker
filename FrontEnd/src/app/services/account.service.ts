import { Injectable } from '@angular/core';
import { Account } from '../shared/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
  })
  export class AccountService {

    constructor(private processHTTPMsgService: ProcessHTTPMsgService,
        private http: HttpClient) { }

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(baseURL + 'account/')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getAccount(id: string): Observable<Account> {
        return this.http.get<Account>(baseURL + 'account/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    createAccount(account: Account): Observable<Account> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.post<Account>(baseURL + 'account/new/' + account.id, account, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    editAccount(account: Account): Observable<Account> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.put<Account>(baseURL + 'account/edit/' + account.id, account, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deleteAccount(id: string): Observable<Account> {
        return this.http.delete<Account>(baseURL + 'account/delete/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getAccountMoneyPerOperation(id: string): Observable<Array<number>> {
        return this.http.get<Array<number>>(baseURL + 'account/money/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getMaxMinMoney(id: string): Observable<Array<number>> {
        return this.http.get<Array<number>>(baseURL + 'account/maxmin/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    // TODO: ESTO NO FUNCIONA PORQUE EN EL BACK FALTA IMPLEMEMENTARLO BIEN
/*     getOperationsInTimeframe(id: string, date1: Date, date2: Date): Observable<Operation[]> {
        return this.http.get<Array<number>>(baseURL + 'account/date/' + id + '/' + date1 + '/' + date2)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    } */
}
