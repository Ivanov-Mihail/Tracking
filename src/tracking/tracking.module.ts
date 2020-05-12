import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db/db.module';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';

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
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
