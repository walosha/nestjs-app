import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class Authservice {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(authDto: AuthDto) {
    try {
      const hashedPassword = await hash(authDto.password);
      const newUser = await this.prisma.user.create({
        data: { email: authDto.email, password: hashedPassword },
        // select: { password: true, email: true },
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('The email already exists');
        }
      }
    }
  }

  async signIn(authDto: AuthDto) {
    // check email exist
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });
    //throw error if it does not
    if (!user) {
      throw new ForbiddenException('Email and/(or) Password is not correct!');
    }
    // Check if password match
    const isPassword = await verify(user.password, authDto.password);

    //throw error if test fails

    if (!isPassword) {
      throw new ForbiddenException('Email and/(or) Password is not correct!');
    }

    return { token: await this.signInToken(user.email, user.id) };
  }

  async signInToken(email: string, userId: number): Promise<string> {
    const JWT_SECRET = this.config.get('JWT_SECRET');
    const payload = { email, sub: userId };

    return await this.jwt.signAsync(payload, {
      secret: JWT_SECRET,
      expiresIn: '20m',
    });
  }
}
