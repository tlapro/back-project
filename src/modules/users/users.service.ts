import { Injectable } from '@nestjs/common';
import { IUser, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: Omit<IUser, 'id'>) {
    return this.usersRepository.createUser(user);
  }

  putFunction(id: number) {
    return this.usersRepository.putFunction(id);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
