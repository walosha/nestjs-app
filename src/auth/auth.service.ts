import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class Authservice {
  constructor(private prisma: PrismaService) {}
  signUp(authDto: AuthDto) {
    const newUser = this.prisma.user.create({
      data: { email: authDto.email, password: authDto.password },
    });
    return newUser;
  }

  signIn() {
    return 'you are logged out';
  }
}
