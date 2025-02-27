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
  async getUsers() {
    return this.users;
  }
}
