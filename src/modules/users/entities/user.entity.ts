import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { GenderEnum } from '@common/constants/gender.enum';
import { RoleEnum } from '@common/constants/role.enum';
import { StatusEnum } from '@common/constants/status.enum';

@Entity({
  name: 'users',
})
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true, length: 255 })
  firstName: string;

  @Column({ nullable: true, length: 255 })
  lastName: string;

  @Column({ nullable: true, unique: true, length: 255 })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.MALE })
  gender: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
