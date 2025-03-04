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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './users.repository';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.usersService.getUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Res() response: Response, @Body() user: IUser) {
    try {
      const newUser = this.usersService.createUser(user);
      response
        .status(201)
        .send({ Mensaje: 'Usuario creado correctamente', user: newUser });
    } catch {
      response.status(400).send('Ocurrió un error al crear el usuario');
    }
  }

  @Put(':id')
  putFunction(@Param('id') id: string) {
    return this.usersService.putFunction(Number(id));
  }

  @Delete('id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
