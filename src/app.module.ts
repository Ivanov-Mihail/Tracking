import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [DbModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
