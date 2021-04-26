import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';
import { DeleteResult } from 'typeorm';
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

  @Get(':id')
  async findOne(@Param('id') id: EntityId): Promise<UserEntity> {
    const user = await this.usersService.findById(id);
    if (isEmpty(user)) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: EntityId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersService.findById(id);
    if (isEmpty(user)) {
      throw new NotFoundException('User not found.');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: EntityId): Promise<DeleteResult> {
    const user = await this.usersService.findById(id);
    if (isEmpty(user)) {
      throw new NotFoundException('User not found.');
    }
    await this.usersService.delete(id);

    return null;
  }
}
