import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { ICredentials } from './auth.controller';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Get all auths.';
  }
  async signUp(user: Omit<CreateUserDto, 'id'>) {
    return await this.usersRepository.signUp(user);
  }

  async signIn(credentials: ICredentials) {
    return await this.usersRepository.signIn(credentials);
  }
}
