import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Authcontroller } from './auth.controller';
import { Authservice } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [Authcontroller],
  providers: [Authservice, JwtStrategy],
})
export class AuthModule {}
