
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherSchema } from './schema/publisher.schema';
import { PointSchema } from './schema/point.schema';
import { SubscriberSchema } from './schema/subscriber.schema';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publisher', schema: PublisherSchema },
      { name: 'Point', schema: PointSchema },
      {name: 'Subscriber', schema: SubscriberSchema },
    ],),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
