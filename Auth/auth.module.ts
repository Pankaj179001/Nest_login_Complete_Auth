import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './Service/Auth.Service';
import { UserLocalStrategy } from './Strategy/UserLocalStrategy/User.Local.Stratgy';
import { PrismaService } from 'src/Prisma.Service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategy/Jwt.Strategy';
import { MemberLocalStrategy } from './Strategy/MemberLocalStrategy/Member.Local.Strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [AuthService, UserLocalStrategy, PrismaService, JwtStrategy, MemberLocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
