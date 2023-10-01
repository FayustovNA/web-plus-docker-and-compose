import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';
import { Wishlist } from './entities/wishlist.entity';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) { }

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { itemsId, ...rest } = createWishlistDto;

      const items = await this.wishesService.getWishListById(itemsId);
      const owner = await this.usersService.findById(userId);

      const wishList = await this.wishlistRepository.save({
        ...rest,
        items,
        owner,
      });
      await queryRunner.commitTransaction();
      return wishList;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const wishlists = await this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });

    if (!wishlists) {
      throw new ServerException(ErrorCode.DataNotFound);
    }
    return wishlists;
  }

  async findById(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new ServerException(ErrorCode.DataNotFound);
    }
    return wishlist;
  }

  async delete(userId: number, wishListId: number) {
    const wishlist = await this.findById(wishListId);

    if (userId !== wishlist.owner.id) {
      throw new ServerException(ErrorCode.DeleteForbidden);
    }

    return await this.wishlistRepository.delete(wishListId);
  }
}
