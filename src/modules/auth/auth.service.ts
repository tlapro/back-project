import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { ICredentials } from './auth.controller';
import { User } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Get all auths.';
  }
  async signUp(user: Omit<User, 'id'>) {
    return await this.usersRepository.signUp(user);
  }

  async signIn(credentials: ICredentials) {
    return await this.usersRepository.signIn(credentials);
  }
}
