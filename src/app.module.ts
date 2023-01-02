/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GoogleModule } from './google/google.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { OperationModule } from './operation/operation.module';

<<<<<<< HEAD
@Module({
  imports: [
  /* MongooseModule.forRoot('mongodb+srv://CostTrackerJaumEzzi:ql7YKsQ5ygDzomLc@costtracker.hbqfwlv.mongodb.net/test',{dbName: 'cost-tracker'}), */
  MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}),
  GoogleModule,
  UserModule,
  AccountModule,
  OperationModule
=======
@Module({ // A CHANGE IN THE NEXT LINE IS NEEDED. USER AND PASSWORD REQUIRED TO CONNECT TO THE DATABASE.
  imports: [ MongooseModule.forRoot('mongodb+srv://<user>:<password>@costtracker.hbqfwlv.mongodb.net/test',{dbName: 'cost-tracker'}),
  /* MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}), */
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }]),
  AuthModule,
>>>>>>> 3ac7bb723a93ef28b735378d4325fae3d4c1c3ea
],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService, 
  ]
})
export class AppModule {}
