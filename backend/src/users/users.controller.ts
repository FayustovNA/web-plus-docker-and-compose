import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { FindUserDto } from './dto/find-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.save(createUserDto);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me')
  async findOnetUserById(
    @Request() { user: { id } },
  ): Promise<UserResponseDto> {
    return await this.usersService.findById(id);
  }

  @Get('me/wishes')
  async getUserWishes(@Request() { user: { id } }): Promise<Wish[]> {
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.getWishes(id, relations);
  }

  @Patch('me')
  @UseInterceptors(PasswordUserInterceptor)
  async updateUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get(':username')
  async findUser(
    @Param('username') username: string,
  ): Promise<UserResponseDto> {
    return await this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  async getWishesByUser(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return this.usersService.getWishes(user.id, relations);
  }

  @Post('find')
  findMany(@Body() dto: FindUserDto) {
    return this.usersService.findMany(dto);
  }
}
