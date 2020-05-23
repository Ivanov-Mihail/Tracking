
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PointSchema } from './schema/point.schema';
import { SubscriberSchema } from './schema/subscriber.schema';
import { Module } from '@nestjs/common/decorators/modules';
import { SubscribtionSchema } from './schema/subscribtion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscribtion', schema: SubscribtionSchema },
      { name: 'Point', schema: PointSchema },
      {name: 'Subscriber', schema: SubscriberSchema },
    ],),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
