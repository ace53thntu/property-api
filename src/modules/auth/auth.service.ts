import * as argon2 from 'argon2';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    const comparePassword = await argon2.verify(user.password, password);

    if (!comparePassword) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    return plainToClass(UserEntity, user);
  }

  async generateJwtToken(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
