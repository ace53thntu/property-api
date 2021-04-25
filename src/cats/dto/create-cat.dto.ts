import { IsInt, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The age of cat',
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsInt()
  readonly age: number;

  @ApiProperty()
  @IsString()
  readonly breed: string;
}
