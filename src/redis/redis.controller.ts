import { Controller, Post, Body, Get, Param, Logger, Delete } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PublisherPositionDTO } from 'src/db/dto/publisher-pos-dto';
import { Publisher } from 'src/db/interfaces/publisher.inteface';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { SubscriberDTO } from 'src/db/dto/subscriber.dto';
import { Subscriber } from 'src/db/interfaces/subscriber.interface';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly dbService: DbService) {}
  timeNow = new Date(Date.now());

  private readonly logger = new Logger('RedisController', false);

  @Get('/publisher') // localhost:3001/publisher
  async GetAllPublishers(): Promise<Publisher[]> {
    this.logger.log(`Request GET: publisher - ${this.timeNow}`);
    return this.dbService.GetAllPublishers();
  }

  @Get('publisher/:id') // localhost:3001/publisher/5eb564ac92fc1c15344586bc
  async GetPublisherById(@Param('id') id: string): Promise<Publisher> {
    this.logger.log(`Request GET: publisher/${id} - ${this.timeNow}`);
    return this.dbService.GetPublisherById(id);
  }

  @Post('/publisher') //localhost:3001/publisher
  CreatePublisher(@Body() publisher: PublisherPositionDTO) {
    this.dbService.AddPublsiher(publisher);
  }

  @Post('/point')  //localhost:3001/point
  CreatePoint(@Body() point: GeoPointDTO) {
    this.dbService.AddPoint(point).then();
  }


  @Get('/subscriber') //localhost:3001/subscriber
  async GetSubscriber(@Param('id') publisherId: string) : Promise<Subscriber[]>{
    const subscribers = this.dbService.GetSubscribers(publisherId);
    return subscribers;
  }

  @Post('/subscriber') //localhost:3001/subscriber
  CreateSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    this.dbService.AddSubscriber(subscriberDTO);
  }


  @Delete('/subscriber')
  DeleteSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    this.dbService.DeleteSubscriber(subscriberDTO);
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
