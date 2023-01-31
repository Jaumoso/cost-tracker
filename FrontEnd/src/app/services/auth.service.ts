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

  login(formData: { username: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(baseURL + '/login', formData);
  }
}
