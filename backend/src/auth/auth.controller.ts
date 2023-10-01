import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SigninUserResponseDto } from './dto/response/signin-user-response.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Request() { user }): Promise<SigninUserResponseDto> {
    return this.authService.auth(user);
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.save(createUserDto);
  }
}
