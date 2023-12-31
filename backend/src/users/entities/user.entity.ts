import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm';

import { BaseEntity } from 'src/entities/base.entity';

import {
    IsString,
    IsEmail,
    IsUrl,
    Length
} from 'class-validator';

import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User extends BaseEntity {

    @Column({ unique: true, length: 30 })
    @IsString()
    @Length(2, 30)
    username: string;

    @Column({ length: 200, default: 'Пока ничего не рассказал о себе' })
    @IsString()
    @Length(2, 200)
    about: string;

    @Column({ default: 'https://i.pravatar.cc/300' })
    @IsUrl()
    avatar: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @OneToMany(() => Wish, (wish) => wish.owner)
    wishes: Wish[];

    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[];

    @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
    wishlists: Wishlist[];
}
