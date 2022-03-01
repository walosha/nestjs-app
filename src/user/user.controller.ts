import { Controller, Get, Ip, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JWTGuard } from '../auth/guards';
import { GetUser } from './decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor() {}

  @UseGuards(JWTGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
