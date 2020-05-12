import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { GeolocationController } from './redis.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RedisClient',
        transport: Transport.REDIS,
        options: {
          url: 'redis://10.0.0.78:6379',
        },
      },
    ]),
    DbModule,
  ],
  providers: [RedisService],
  controllers: [GeolocationController],
})
export class RedisModule {}
