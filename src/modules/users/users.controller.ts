/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ICredentials } from '../auth/auth.controller';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard)
  async getUsers(
    @Res() response: Response,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    try {
      const users = await this.usersService.getUsers(pageNumber, limitNumber);
      return response.status(201).json(users);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  signUp(@Res() response: Response, @Body() user: CreateUserDto) {
    try {
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
  putFunction(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.putFunction(id);
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
