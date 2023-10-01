import {
  IsString,
  MinLength,
  Length,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 30)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Length(2, 200)
  @IsOptional()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
