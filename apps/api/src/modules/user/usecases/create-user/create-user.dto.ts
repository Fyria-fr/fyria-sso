import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  role: string;

  @IsString()
  appName: string;
}
