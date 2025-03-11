/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ICredentials } from '../auth/auth.controller';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find();
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

  async signUp(user: Omit<User, 'id'>) {
    const existingUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new Error('Ya existe un usuario con ese email.');
    }

    try {
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Error al guardar el usuario en la base de datos.');
    }
  }

  async signIn(credentials: ICredentials) {
    const { email, password } = credentials;

    const user = await this.usersRepository.findOneBy({ email });
    if (!user || user.password !== password) {
      throw new Error('Usuario o contraseña incorrectos.');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
