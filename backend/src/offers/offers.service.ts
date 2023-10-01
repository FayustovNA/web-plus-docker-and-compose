import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private usersService: UsersService,
    private wishesService: WishesService,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: number) {
    const offer = await this.offerRepository.find({
      where: { id },
      relations: ['item', 'user'],
    });
    if (offer.length === 0) {
      throw new ServerException(ErrorCode.DataNotFound);
    }
    return offer;
  }

  async findMany() {
    const offers = await this.offerRepository.find({
      relations: ['item', 'user'],
    });
    if (offers.length === 0) {
      throw new ServerException(ErrorCode.DataNotFound);
    }
    return offers;
  }

  async create(userId, dto: CreateOfferDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const wish = await this.wishesService.findById(dto.itemId);

      if (!wish) {
        throw new ServerException(ErrorCode.DataNotFound);
      }

      if (userId === wish.owner.id) {
        throw new ForbiddenException('This is your wish');
      }

      const totalSumm = Number(wish.raised) + Number(dto.amount);

      if (totalSumm > wish.price) {
        throw new ServerException(ErrorCode.OfferSummForbidden);
      }

      await this.wishesService.raisedUpdate(dto.itemId, {
        raised: totalSumm,
      });

      const user = await this.usersService.findById(wish.owner.id);

      const offer = await this.offerRepository.save({
        ...dto,
        wish,
        user,
      });

      await queryRunner.commitTransaction();
      delete wish.owner.password;
      delete user.password;
      return offer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
