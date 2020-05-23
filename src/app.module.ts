
import { DbModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingModule } from './tracking/tracking.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FollowModule } from './follow/follow.module';


@Module({
  imports: [  
    DbModule,
    TrackingModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.APP_DB_CONNECTION),
    FollowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
