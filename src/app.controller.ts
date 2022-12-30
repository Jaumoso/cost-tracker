/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, UseGuards, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiCreatedResponse({description: 'Default GET Request to test connectivity to aplication.'})
  getHello(): string {
    return this.appService.getHello();
  }

}