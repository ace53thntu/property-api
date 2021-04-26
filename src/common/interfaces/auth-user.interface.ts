import { EntityId } from 'typeorm/repository/EntityId';

export interface IAuthUser {
  email: string;
  sub: EntityId;
  iat: number;
  exp: number;
}
