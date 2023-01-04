/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // DEFAULT REQUEST
  @Get()
  @ApiCreatedResponse({description: 'Default GET Request to test connectivity to aplication.'})
  getHello(): string {
    return this.appService.getHello();
  }

}