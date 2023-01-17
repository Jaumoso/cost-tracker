import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Operation } from '../shared/Operation';

@Injectable({
    providedIn: 'root'
  })
  export class OperationService {

    constructor(private processHTTPMsgService: ProcessHTTPMsgService,
        private http: HttpClient) { }

    getOperations(): Observable<Operation[]> {
        return this.http.get<Operation[]>(baseURL + 'operation/')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getOperation(id: string): Observable<Operation> {
        return this.http.get<Operation>(baseURL + 'operation/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    createOperation(operation: Operation): Observable<Operation> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.post<Operation>(baseURL + 'operation/new/' + operation.id, operation, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    editOperation(operation: Operation): Observable<Operation> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.put<Operation>(baseURL + 'operation/edit/' + operation.id, operation, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    deleteOperation(id: string): Observable<Operation> {
        return this.http.delete<Operation>(baseURL + 'operation/delete/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

     getOperationsInTimeframe(id: string, date1: Date, date2: Date): Observable<Operation[]> {
        return this.http.get<Operation[]>(baseURL + 'account/date/' + date1 + '/' + date2)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
