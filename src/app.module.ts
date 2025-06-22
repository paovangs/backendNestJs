import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmRepositoryModule } from './common/infrastructure/database/typeorms/type-orm.module';

@Module({
  imports: [TypeOrmRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
