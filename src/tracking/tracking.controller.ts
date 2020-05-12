import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Logger,
  Delete,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PublisherPositionDTO } from 'src/db/dto/publisher-pos-dto';
import { Publisher } from 'src/db/interfaces/publisher.inteface';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { SubscriberDTO } from 'src/db/dto/subscriber.dto';
import { Subscriber } from 'src/db/interfaces/subscriber.interface';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly dbService: DbService) {}
  private timeNow: Date = new Date(Date.now());

  private readonly logger = new Logger('TrackingController', false);

  @Get('/publisher') // localhost:3001/geolocation/publisher
  async GetAllPublishers(): Promise<Publisher[]> {
    this.logger.log(`Request GET: publisher - ${this.timeNow}`);
    return this.dbService.GetAllPublishers();
  }

  @Get('publisher/:id') // localhost:3001/geolocation/publisher/5eb564ac92fc1c15344586bc
  async GetPublisherById(@Param('id') id: string): Promise<Publisher> {
    this.logger.log(`Request GET: publisher/${id} - ${this.timeNow}`);
    return this.dbService.GetPublisherById(id);
  }

  @Post('/publisher') //localhost:3001/geolocation/publisher
  async CreatePublisher(@Body() publisher: PublisherPositionDTO) {
    await this.dbService.AddPublsiher(publisher);
  }

  @Post('/point') //localhost:3001/geolocation/point
  async CreatePoint(@Body() point: GeoPointDTO) {
    await this.dbService.AddPoint(point).then();
    console.log();
  }

  @Get('/subscriber') //localhost:3001/geolocation/subscriber
  async GetSubscriber(@Param('id') publisherId: string): Promise<Subscriber[]> {
    const subscribers = await this.dbService.GetSubscribers(publisherId);
    return subscribers;
  }

  @Post('/subscriber') //localhost:3001/geolocation/subscriber
  async CreateSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    await this.dbService.AddSubscriber(subscriberDTO);
  }

  @Delete('/subscriber')
  async DeleteSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    await this.dbService.DeleteSubscriber(subscriberDTO);
  }

  /* ****************************************************************************** 

  @MessagePattern('tracking.newreport')
  addPosition(
    @Payload() dataArray: PublisherPositionDTO,
    @Ctx() context: RedisContext,
  ) {
    console.log(`Data: ${dataArray}`);
    console.log(`Channel: ${context.getChannel()}`);
    console.log(`Data: ${JSON.stringify(dataArray)}`);
    this.dbService.saveReport(dataArray);
  }

 ****************************************************************************** */
}
