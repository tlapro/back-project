import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(request: Request) {
  const token = '<email>:<password>';
  const authHeader = request.headers['authorization'];

  if (!authHeader || authHeader !== token) {
    throw new UnauthorizedException(
      'No autorizado. Token inválido o inexistente.',
    );
  }
  return authHeader === token;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
