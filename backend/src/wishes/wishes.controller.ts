import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateWishDto } from './dto/create-wish.dto';
import { UseInterceptors } from '@nestjs/common';
import { PasswordWishInterceptor } from 'src/interceptors/password-wish.interceptor';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Request() { user: { id } },
    @Body() dto: CreateWishDto,
  ): Promise<Wish> {
    return await this.wishesService.create(id, dto);
  }

  @Get('last')
  async getLastWish(): Promise<Wish[]> {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async getTopWish(): Promise<Wish[]> {
    return await this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(PasswordWishInterceptor)
  @Get(':id')
  async getWishById(@Param('id') id: number): Promise<Wish> {
    return await this.wishesService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(
    @Request() request,
    @Param('id') wishId: number,
  ): Promise<Wish> {
    if (!request.user) {
      throw new Error('User not found');
    }
    const userId = request.user.id;
    const copiedWish = await this.wishesService.copy(userId, wishId);
    return copiedWish;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Request() { user: { id } }, @Param('id') wishId: number) {
    return await this.wishesService.removeOne(id, wishId);
  }
}
