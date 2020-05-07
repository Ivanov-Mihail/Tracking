import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://10.0.0.78:6379',
        }
      },
    ]),
  ],
  providers: [RedisService],
  controllers: [RedisController]
})
export class RedisModule {}
