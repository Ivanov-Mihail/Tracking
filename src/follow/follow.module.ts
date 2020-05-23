import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  imports: [DbModule]
})
export class FollowModule {}
