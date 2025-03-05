/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { ICredentials } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'Get all auths.';
  }

  signIn(credentials: ICredentials) {
    try {
      return this.usersRepository.signIn(credentials);
    } catch (error) {
      throw new Error('Error en la autenticación');
    }
  }
}
