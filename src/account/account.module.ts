import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { OperationModule } from 'src/operation/operation.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './schemas/account.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
        OperationModule
    ],
    controllers: [AccountController],
    providers: [AccountService, JwtStrategy]
})
export class AccountModule {}
