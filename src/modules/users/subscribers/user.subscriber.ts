import * as argon2 from 'argon2';

import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    const { password } = event.entity;
    event.entity.password = await argon2.hash(password);
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    if (
      event.entity.password &&
      event.entity.password !== event.databaseEntity.password
    ) {
      event.entity.password = await argon2.hash(event.entity.password);
    }
  }
}
