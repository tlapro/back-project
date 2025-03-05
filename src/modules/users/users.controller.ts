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
import { IUser } from './users.repository';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

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
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Res() response: Response, @Body() user: IUser) {
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
      const newUser = this.usersService.createUser(user);
      response
        .status(201)
        .send({ message: 'Usuario creado correctamente', user: newUser });
    } catch {
      response.status(400).send('Ocurrió un error al crear el usuario');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  putFunction(@Param('id') id: string) {
    return this.usersService.putFunction(Number(id));
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
