import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from '../snake-naming.strategy';

export default () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    keepConnectionAlive: true,
    migrationsRun: true,
    synchronize:
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'staging',
  } as PostgresConnectionOptions,
});
