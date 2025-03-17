/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Debes ingresar un mail.' })
  @IsEmail({}, { message: 'El email no es válido.' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Debes ingresar una contraseña.' })
  @IsString()
  password: string;
}
