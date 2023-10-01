import {
  IsString,
  MinLength,
  Length,
  IsEmail,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @Length(1, 30)
  @IsOptional()
  @IsString()
  username: string;

  @Length(2, 200)
  @IsOptional()
  @IsString()
  about: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(5)
  @IsOptional()
  @IsString()
  password: string;

  @IsUrl()
  @IsOptional()
  avatar: string;
}
