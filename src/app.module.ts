import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { RedisModule } from './redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DbModule,
    RedisModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tracking'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
