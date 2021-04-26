import {
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
  ValidationArguments,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Trim } from '@common/decorators/transforms.decorator';
import { Unique } from '@common/validators/unique.validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of user.',
  })
  @IsNotEmpty()
  @Trim()
  readonly firstName: string;

  @ApiProperty({
    description: 'Last name of user.',
  })
  @IsNotEmpty()
  @Trim()
  readonly lastName: string;

  @ApiProperty({
    description: 'Email of user.',
  })
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @Validate(Unique, [UserEntity], {
    message: (args: ValidationArguments) => {
      return `email '${args.value}' already exist.`;
    },
  })
  readonly email: string;

  @ApiProperty({
    description: 'Password of user.',
    minLength: 8,
    maxLength: 24,
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Trim()
  readonly password: string;
}
