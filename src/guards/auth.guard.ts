/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new BadRequestException('Authorization header missing');
    }
    if (typeof authHeader !== 'string') {
      throw new BadRequestException('Authorization header must be a string');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new BadRequestException(
        'Invalid authorization header format. Expected "Bearer <token>"',
      );
    }

    const token = parts[1];
    try {
      const secret = process.env.JWT_SECRET;
      this.jwtService.verify(token, { secret });
      return true;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ocurrió un error inesperado',
      );
    }
  }
}
