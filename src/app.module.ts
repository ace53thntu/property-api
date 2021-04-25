import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CoreModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
