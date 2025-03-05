/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

export interface ICredentials {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  signIn(@Res() response: Response, @Body() credentials: ICredentials) {
    try {
      const result = this.authService.signIn(credentials);
      response.status(200).send({ message: result.message, user: result.user });
    } catch (error) {
      response.status(404).send({ error: error.message });
    }
  }
}
