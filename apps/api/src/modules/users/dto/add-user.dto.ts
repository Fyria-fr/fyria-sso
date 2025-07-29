import { IsEmail, IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
