import {
    Entity,
    Column,
    ManyToMany,
    ManyToOne,
    JoinTable,
} from 'typeorm';

import { BaseEntity } from 'src/entities/base.entity';

import {
    IsString,
    Length
} from 'class-validator';

import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist extends BaseEntity {

    @Column({ length: 250 })
    @IsString()
    @Length(1, 250)
    name: string;

    @Column()
    @IsString()
    image: string;

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User;

    @ManyToMany(() => Wish, (wish) => wish.name)
    @JoinTable()
    items: Wish[];
}
