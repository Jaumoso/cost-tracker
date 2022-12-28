import { Injectable } from '@angular/core';
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
}
