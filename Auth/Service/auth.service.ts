import { HttpException, HttpStatus, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/Prisma.Service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  //validating user for authentication
  async validateUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      const userInfo = await this.prisma.user.findUnique({
        where: { email },
        include: {
          business: true,
          roles: { select: { roles: { select: { role: true } } } },
        },
      });
      return userInfo;
    }
  }
  //generating token
  generateToken(payload: any): string {
    return this.jwtService.sign(payload)
  }
  //validating Member for authentication
  async ValidateMember(email: string) {
    const Member = await this.prisma.member.findUnique({ where: { email: email } })
    if (Member) {
      return Member
    }
    throw new HttpException('wrong input credentials', HttpStatus.BAD_REQUEST);

  }


}


