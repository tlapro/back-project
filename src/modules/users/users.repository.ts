/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}

@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Tom',
      email: 'tom@gmail.com',
      password: '123456',
      address: 'admiCalle Falsa 123',
      phone: '123456789',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      name: 'Maria',
      email: 'maria@gmail.com',
      password: '123456',
      address: 'admiCalle Falsa 123',
      phone: '123456789',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 3,
      name: 'Juan',
      email: 'juan@gmail.com',
      password: '123456',
      address: 'admiCalle Falsa 123',
      phone: '123456789',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
  ];

  async getUsers(page: number, limit: number) {
    return this.users.map(({ password, ...user }) => user);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: Omit<IUser, 'id'>) {
    const id = this.users.length + 1;
    const newUser = { id, ...user };
    this.users = [...this.users, newUser];
    return id;
  }

  putFunction(id: number) {
    const user = this.users.find((user) => user.id === id);
    return ['Logica del put para modificar el usuario con el id', id];
  }

  deleteUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    return ['Logica del delete para eliminar el usuario con el id: ', user];
  }
}
