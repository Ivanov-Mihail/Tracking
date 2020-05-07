import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './schema/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
