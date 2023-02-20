import { Injectable, HttpException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/Auth/Service/Auth.Service";

@Injectable()
export class MemberLocalStrategy extends PassportStrategy(Strategy, 'member') {
    constructor(private readonly Authservice: AuthService) {
        super({ usernameField: "email" })
    }

    async validate(email: string, password: string): Promise<any> {
        const Member = await this.Authservice.ValidateMember(email)
        if (!Member) {
            throw new UnauthorizedException()
        }
        const MatchPassword = await bcrypt.compare(password, Member.password)
        if (MatchPassword)
            return Member
    }
}