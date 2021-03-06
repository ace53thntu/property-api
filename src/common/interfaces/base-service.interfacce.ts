import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(ids: [EntityId]): Promise<T[]>;

  create(data: Partial<T> | any): Promise<T>;

  update(id: EntityId, data: Partial<T> | any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
