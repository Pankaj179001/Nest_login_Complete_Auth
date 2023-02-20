import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from "bcrypt"
import { AuthService } from '../../Service/Auth.Service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy, "user") {
    constructor(private readonly Authservice: AuthService) {
        super({ usernameField: "email" })
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.Authservice.validateUser(email)
        if (!user) {
            throw new UnauthorizedException()
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (comparePassword == true) {
            return user
        }
        throw new UnauthorizedException()

  }
}
