import { Controller, Post, Body } from '@nestjs/common';
import {
  RedisContext,
  Ctx,
  Payload,
  MessagePattern,
} from '@nestjs/microservices';
import { ReportDTO } from 'src/db/dto/report.dto';
import { DbService } from 'src/db/db.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly reportService: DbService) {}

  @MessagePattern('tracking.newreport')
  async getNotifications(
    @Payload() data: ReportDTO,
    @Ctx() context: RedisContext,
  ) {
    console.log(`Channel: ${context.getChannel()}`);
    console.log(`Data: ${JSON.stringify(data)}`);
    console.log(`Data: ${data}`);

    await this.reportService.saveReport(data);
  }

  @Post()
  async create(@Body('report') report: ReportDTO) {
    console.log(`reportDTO: ${JSON.stringify(report)}`);
    await this.reportService.saveReport(report);
  }
}
