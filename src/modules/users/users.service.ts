import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/users.entity';
import { ICredentials } from '../auth/auth.controller';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  signUp(user: Omit<User, 'id'>) {
    return this.usersRepository.signUp(user);
  }

  signIn(credentials: ICredentials) {
    return this.usersRepository.signIn(credentials);
  }

  putFunction(id: string) {
    return this.usersRepository.putFunction(id);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
