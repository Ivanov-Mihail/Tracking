
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PointSchema } from './schema/point.schema';
import { SubscriberSchema } from './schema/subscriber.schema';
import { Module } from '@nestjs/common/decorators/modules';
import { SubscriptionSchema } from './schema/subscribtion.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RedisClient',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL,
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
      { name: 'Point', schema: PointSchema },
      {name: 'Subscriber', schema: SubscriberSchema },
    ],),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
