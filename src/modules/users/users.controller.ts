import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { EntityId } from 'typeorm/repository/EntityId';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  index(): Promise<UserEntity[]> {
    return this.usersService.index();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.usersService.create(createUserDto);
    return plainToClass(UserEntity, createdUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }
}
