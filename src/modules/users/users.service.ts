import { BaseService } from '@common/providers/base.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<UserEntity, UsersRepository> {
  constructor(repository: UsersRepository) {
    super(repository);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({ email });
  }
}
