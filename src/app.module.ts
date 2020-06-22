
import { DbModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingModule } from './tracking/tracking.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FollowModule } from './follow/follow.module';
import { UberH3Module } from './uber-h3/uber-h3.module';


@Module({
  imports: [  
    DbModule,
    TrackingModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.APP_DB_CONNECTION),
    FollowModule,
    UberH3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
