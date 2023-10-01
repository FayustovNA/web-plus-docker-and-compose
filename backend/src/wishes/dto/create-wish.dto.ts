import {
  IsString,
  IsNumber,
  Length,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Length(1, 1024)
  @IsString()
  @IsOptional()
  description: string;
}
