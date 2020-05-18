import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db/db.module';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { AuthModule } from 'cityride-auth/dist/auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RedisClient',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL,
        },
      },
    ]),
    AuthModule.registerFrom("10.0.0.78","6379"),
    DbModule,
  ],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
