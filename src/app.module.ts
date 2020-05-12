
import { DbModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingModule } from './tracking/tracking.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

@Module({
  imports: [
    DbModule,
    TrackingModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tracking'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
