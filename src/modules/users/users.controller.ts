import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/entities/users.entity';
import { ICredentials } from '../auth/auth.controller';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.usersService.getUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  signup(@Res() response: Response, @Body() user: User) {
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
        response.status(400).send('Completa todos los campos');
        return;
      }
      const newUser = this.usersService.signUp(user);
      response
        .status(201)
        .send({ message: 'Usuario creado correctamente', user: newUser });
    } catch {
      response.status(400).send('Ocurrió un error al crear el usuario');
    }
  }
  @Post()
  signin(@Res() response: Response, @Body() credentials: ICredentials) {
    try {
      const { email, password } = credentials;
      if (!email || !password) {
        response.status(400).send('Completa todos los campos');
        return;
      }
      const newUser = this.usersService.signIn(credentials);
      response.status(201).send({ message: 'Login exitoso', user: newUser });
    } catch {
      response.status(400).send('Ocurrió un error al crear el usuario');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  putFunction(@Param('id') id: string) {
    return this.usersService.putFunction(id);
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
