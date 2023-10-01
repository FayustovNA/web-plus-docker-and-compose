import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import {
    IsNotEmpty,
    Length,
    IsUrl,
    IsNumber,
    IsInt,
} from 'class-validator';

import { BaseEntity } from 'src/entities/base.entity';

import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish extends BaseEntity {

    @Column({ length: 250 })
    @IsNotEmpty()
    @Length(1, 250)
    name: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    link: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    image: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Column({ type: 'decimal', default: 0 })
    @IsNumber()
    raised: number;

    @ManyToOne(() => User, (user) => user.wishes)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @Column({ length: 1024 })
    @IsNotEmpty()
    @Length(1, 1024)
    description: string;

    @OneToMany(() => Offer, (offer) => offer.item)
    offers: Offer[];

    @Column({ default: 0 })
    @IsInt()
    copied: number;
}
