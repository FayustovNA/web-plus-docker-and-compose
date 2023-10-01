import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { PasswordUserInterceptor } from 'src/interceptors/password-user.interceptor';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PasswordWishInterceptor } from 'src/interceptors/password-wish.interceptor';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseInterceptors(PasswordUserInterceptor)
  @Get()
  async getAll(): Promise<Wishlist[]> {
    return await this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() dto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return await this.wishlistsService.create(id, dto);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get(':id')
  async getWishlist(@Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.findById(id);
  }

  @Delete(':id')
  async deleteWishlist(
    @Request() { user: { id } },
    @Param('id') wishListId: number,
  ) {
    return await this.wishlistsService.delete(id, wishListId);
  }
}
