import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { Account } from '../shared/Account';
import { Operation } from '../shared/Operation';
import { User } from '../shared/User';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  login(formData: { username: string, password: string }): Observable<{ access_token: string }> {
    console.log("formData: " , formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<{ access_token: string }>(baseURL + 'auth/login', formData, httpOptions);
  }
}