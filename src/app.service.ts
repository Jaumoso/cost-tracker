/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  // DEFAULT FUNCTIONS --------------------------------
  getHello(): string {
    return 'Hello World!';
  }
}
