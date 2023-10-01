import { IsString, MinLength, IsNotEmpty, Length } from 'class-validator';

export class SigninUserDto {
  @Length(1, 30)
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  password: string;
}
