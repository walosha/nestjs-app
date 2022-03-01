import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Authservice } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class Authcontroller {
  constructor(private authService: Authservice) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
