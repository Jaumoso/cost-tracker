import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../user/schemas/user.schema"
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }