import { AuthUser } from '@common/decorators/auth-user.decorator';
import { IAuthUser } from '@common/interfaces/auth-user.interface';
import { UserEntity } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request) {
    return this.authService.generateJwtToken(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async profile(@AuthUser() authUser: IAuthUser): Promise<UserEntity> {
    const user = await this.usersService.findById(authUser.sub);
    return plainToClass(UserEntity, user);
  }
}
