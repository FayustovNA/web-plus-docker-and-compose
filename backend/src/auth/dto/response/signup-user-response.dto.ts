import {
  IsString,
  Length,
  IsEmail,
  IsUrl,
  IsDate,
  IsInt,
} from 'class-validator';

export class SignupUserResponseDto {
  @IsInt()
  id: number;

  @Length(1, 30)
  @IsString()
  username: string;

  @Length(1, 200)
  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
