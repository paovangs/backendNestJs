import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmRepositoryModule } from './common/infrastructure/database/typeorms/type-orm.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { StudentService } from './modules/student/students.service';
import { TransactionModule } from './common/infrastructure/transaction/transaction.module';

@Module({
  imports: [TypeOrmRepositoryModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    StudentService,
  ],
  exports: [],
})
export class AppModule {}
