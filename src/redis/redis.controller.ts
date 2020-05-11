import { Controller, Post, Body } from '@nestjs/common';
import {
  RedisContext,
  Ctx,
  Payload,
  MessagePattern,
} from '@nestjs/microservices';
import { DbService } from 'src/db/db.service';
import { PublisherPositionDTO } from 'src/db/dto/publisher-pos-dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly reportService: DbService) {}

  @MessagePattern('tracking.newreport')
  getNotifications(
    @Payload() dataArray: PublisherPositionDTO,
    @Ctx() context: RedisContext,
  ) {
    console.log(`Data: ${dataArray}`);
    console.log(`Channel: ${context.getChannel()}`);
    console.log(`Data: ${JSON.stringify(dataArray)}`);
    this.reportService.saveReport(dataArray);
  }

  @Post()
  async create(@Body() report: PublisherPositionDTO) {
    console.log(`reportDTO: ${JSON.stringify(report)}`);
    console.log(`Data: ${report}`);
    this.reportService.saveReport(report);
  }
}
