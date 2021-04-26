import { BaseEntity, DeleteResult, Repository } from 'typeorm';

import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from '@common/interfaces/base-service.interfacce';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T> {
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  create(data: Partial<T> | any): Promise<T> {
    return this.repository.save(data);
  }

  update(id: EntityId, data: Partial<T> | any): Promise<T> {
    return this.repository.update(id, data).then((result) => result.raw[0]);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
