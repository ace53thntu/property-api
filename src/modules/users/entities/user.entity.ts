import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { GenderType } from '@common/constants/gender';
import { RoleType } from '@common/constants/role';
import { StatusType } from '@common/constants/status';

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

  @Column({ type: 'enum', enum: GenderType, default: GenderType.MALE })
  gender: string;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ACTIVE })
  status: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
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
