/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { LoginUserDto } from '../users/dtos/LoginUser.dto';

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

  @Post('signup')
  async signUp(@Res() response: Response, @Body() user: CreateUserDto) {
    try {
      const { name, email, password, address, phone, country, city } = user;
      if (
        !name ||
        !email ||
        !password ||
        !address ||
        !phone ||
        !country ||
        !city
      ) {
        return response
          .status(400)
          .json({ error: 'Completa todos los campos' });
      }

      const newUser = await this.authService.signUp(user);
      return response
        .status(201)
        .json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  @Post('signin')
  async signIn(@Res() response: Response, @Body() credentials: LoginUserDto) {
    try {
      const { email, password } = credentials;
      if (!email || !password) {
        return response
          .status(400)
          .json({ error: 'Completa todos los campos' });
      }

      const userLogged = await this.authService.signIn(credentials);
      return response
        .status(200)
        .json({ message: 'Login exitoso', user: userLogged });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
