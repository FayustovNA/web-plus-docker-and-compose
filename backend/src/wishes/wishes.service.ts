import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ErrorCode } from 'src/exceptions/error-codes';
import { ServerException } from 'src/exceptions/server.exception';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
    private usersService: UsersService,
    private readonly dataSource: DataSource,
  ) { }

  async create(ownerId: number, createWishDto: CreateWishDto) {
    try {
      const { password, ...rest } = await this.usersService.findById(ownerId);
      return await this.wishesRepository.save({
        ...createWishDto,
        owner: rest,
      });
    } catch {
      throw new ServerException(ErrorCode.SaveError);
    }
  }

  async findById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wish;
  }

  async findLast(): Promise<Wish[]> {
    const wishes = await this.wishesRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    return wishes;
  }

  async findTop(): Promise<Wish[]> {
    const wishes = await this.wishesRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
    if (!wishes) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wishes;
  }

  async getWishListById(ids: number[]): Promise<Wish[]> {
    const wishes = await this.wishesRepository
      .createQueryBuilder('item')
      .where('item.id IN (:...ids)', { ids })
      .getMany();

    if (!wishes) {
      throw new ServerException(ErrorCode.DataNotFound);
    }
    return wishes;
  }

  async removeOne(wishId: number, userId: number) {
    const wish = await this.findById(wishId);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.DeleteForbidden);
    }
    return await this.wishesRepository.delete(wishId);
  }

  async raisedUpdate(id: number, raised: any) {
    const wish = await this.wishesRepository.update(id, raised);
  }

  async copy(userId: number, wishId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id, createdAt, updatedAt, owner, ...wish } = await this.findById(
        wishId,
      );
      const copiedWish = await this.create(userId, wish);
      await this.wishesRepository.update(wishId, {
        copied: copiedWish.copied + 1,
      });
      await queryRunner.commitTransaction();
      return copiedWish;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
