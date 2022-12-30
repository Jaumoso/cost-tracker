/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req) {
        return req.user;
    }
}
