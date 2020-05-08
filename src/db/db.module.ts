import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherSchema } from './schema/publisher.schema';
import { PointSchema } from './schema/point.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Publisher', schema: PublisherSchema },{ name: 'Point', schema: PointSchema }],),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
