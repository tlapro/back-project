/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile() {
    return 'Este endpoint devolverá un profile';
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
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
