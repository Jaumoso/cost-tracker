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

  getUser(id:string): User{
    return USERS.filter(user => (user.id = id))[0];
  }
}
