/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = this.userService.getUserByEmail(email);
    if(!user || (await user).password === password){
        return false;
    }
    return user;
  }
}
