import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return 'Get all auths.';
  }
}
