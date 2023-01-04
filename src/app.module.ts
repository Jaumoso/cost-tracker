/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GoogleModule } from './google/google.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [
  /* MongooseModule.forRoot('mongodb+srv://CostTrackerJaumEzzi:L4BXoFfMPHTPab19@costtracker.hbqfwlv.mongodb.net/test',{dbName: 'cost-tracker'}), */
  MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}),
  GoogleModule,
  UserModule,
  AccountModule,
  OperationModule,
],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService, 
  ]
})
export class AppModule {}
