import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUser(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('No se ha podido encontrar el usuario');
        }
        // ! comentado por seguridad
/*         if (user && passwordValid) {
            return user;
        } */
        // ! Devuelve el usuario sin password ni email, por seguridad.
        if (user && passwordValid) {
            const { password, email, ... rest } = user;
            return rest;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}