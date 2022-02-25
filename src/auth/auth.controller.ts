import { Body, Controller, Post } from '@nestjs/common';
import { Authservice } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class Authcontroller {
  constructor(private authService: Authservice) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signup')
  signIn() {
    return this.authService.signIn();
  }
}
