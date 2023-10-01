import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class SigninUserResponseDto {
  @IsString()
  access_token: string;
}
