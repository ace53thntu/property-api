import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import type { AbstractDto } from '../dto/abstract.dto';
// import { UtilsService } from '../providers/utils.service';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  // toDto(options?: any): T {
  //   return UtilsService.toDto(this.dtoClass, this, options);
  // }
}
