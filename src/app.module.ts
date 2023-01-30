import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GoogleModule } from './google/google.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://CostTrackerJaumEzzi:38Ruh0nQ3PeJi16M@costtracker.hbqfwlv.mongodb.net/test',{dbName: 'cost-tracker'}),
  // MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}),
  /* MongooseModule.forRoot('mongodb+srv://CostTrackerJaumEzzi:3MXUq6aeANqu5YkU@costtracker.hbqfwlv.mongodb.net/test',{dbName: 'cost-tracker'}), */
  MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}),
  GoogleModule,
  UserModule,
  AccountModule,
  OperationModule,
  AuthModule,
],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService, 
  ]
})
export class AppModule {}
