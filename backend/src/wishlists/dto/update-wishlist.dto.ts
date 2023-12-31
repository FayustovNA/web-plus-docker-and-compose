import { Length, IsUrl, IsArray, IsOptional } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @Length(1, 250)
  name: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsArray()
  itemsId: number[];
}
