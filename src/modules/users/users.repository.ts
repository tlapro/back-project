/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ICredentials } from '../auth/auth.controller';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find({
      relations: ['orders'],
    });
    if (users.length === 0) {
      throw new Error('No existen usuarios registrados.');
    }
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async putFunction(id: string) {
    // const user = this.users.find((user) => user.id === id);
    // return ['Logica del put para modificar el usuario con el id', id];
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete({ id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async signUp(user: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new Error('Ya existe un usuario con ese email.');
    }

    try {
      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden');
      }
      const hashedPassword = await this.hashPassword(user.password);
      const userHashed = { ...user, password: hashedPassword };
      const newUser = this.usersRepository.create(userHashed);
      await this.usersRepository.save(newUser);
      const {
        password: ignoredPassword,
        confirmPassword: ignoredConfirmPassword,
        ...userWithoutPassword
      } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ocurrió un error inesperado',
      );
    }
  }

  async hashPassword(password: string): Promise<string> {
    if (!password || typeof password !== 'string') {
      throw new Error('La contraseña debe ser un string válido.');
    }
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signIn(credentials: ICredentials) {
    const { email, password } = credentials;
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Usuario o contraseña incorrectos.');
    }
    const isPasswordOk = await this.comparePasswords(password, user.password);

    if (!isPasswordOk) {
      throw new BadRequestException('Usuario o contraseña incorrectos.');
    }
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(userPayload);
    const { password: _, ...userWithoutPassword } = user;
    return { success: 'Login Successfully', user: userWithoutPassword, token };
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
