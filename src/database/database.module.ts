import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<string>('database.type'),
          host: configService.get<string>('database.host'),
          port: +configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          namingStrategy: configService.get<any>('database.namingStrategy'),
          logging: configService.get<boolean>('database.logging'),
          synchronize: configService.get<boolean>('database.synchronize'),
          migrationsRun: configService.get<boolean>('database.migrationsRun'),
          keepConnectionAlive: configService.get<boolean>(
            'database.keepConnectionAlive',
          ),
          entities: [__dirname + './../modules/**/entities/**.entity{.ts,.js}'],
        } as PostgresConnectionOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
