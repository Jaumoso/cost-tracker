/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserSchema } from './user/schemas/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

import { AccountSchema } from './account/schemas/account.schema';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';

import { OperationSchema } from './operation/schemas/operation.schema';
import { OperationService } from './operation/operation.service';
import { OperationController } from './operation/operation.controller';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'cost-tracker'}),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }])
],
  controllers: [AppController, UserController, AccountController, OperationController],
  providers: [AppService, UserService, AccountService, OperationService],
})
export class AppModule {}
