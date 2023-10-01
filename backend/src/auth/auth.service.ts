import { Injectable } from '@nestjs/common';
import { compare, compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { SigninUserResponseDto } from './dto/response/signin-user-response.dto';
import { SignupUserResponseDto } from './dto/response/signup-user-response.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async auth(user: User): Promise<SigninUserResponseDto> {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<SignupUserResponseDto> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new ServerException(ErrorCode.IncorrectData);
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      throw new ServerException(ErrorCode.IncorrectData);
    } else {
      const { password, ...result } = user;
      return result;
    }
  }
}
