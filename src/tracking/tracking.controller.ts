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




  @Post('location')
  async SaveLocation(@Body()location : GeoPointDTO){
    await this.dbService.SavePoint(location);
    console.log(' Drivers location successfully saved! ');

  }


 /* ------------------------------------------------------------------------------- */

  @Get('/publisher') // localhost:3001/tracking/publisher
  async GetAllPublishers(): Promise<Publisher[]> {
    this.logger.log(`Request GET: publisher - ${this.timeNow}`);
    return this.dbService.GetAllPublishers();
  }

  @Get('publisher/:id') // localhost:3001/tracking/publisher/?id=21
  async GetPublisherPositionById(@Param('id') id: number): Promise<Publisher> {
    
    this.logger.log(`Request GET: publisher/${id} - ${this.timeNow}`);
    return this.dbService.GetPublisherById(id);
  }

  @Post('/publisher') //localhost:3001/tracking/publisher
  async SavePublisherPosition(@Body() publisher: PublisherPositionDTO) {
    await this.dbService.SavePublisherPosition(publisher);
  }



  //#region  -------------------------------------------------------------------------- 

  @Post('/point') //localhost:3001/tracking/point
  async CreatePoint(@Body() point: GeoPointDTO) {
    await this.dbService.SavePoint(point).then();
    console.log();
  }

  @Get('/subscriber/:id') //localhost:3001/tracking/subscriber
  async GetSubscriber(@Param('id') id: string): Promise<Subscriber> {
    const subscribers = await this.dbService.GetSubscribersByPublihserId(+id);
    return subscribers;
  }

  @Post('/subscriber') //localhost:3001/tracking/subscriber
  async CreateSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    await this.dbService.SaveSubscriber(subscriberDTO);
  }

  @Delete('/subscriber')
  async DeleteSubscriber(@Body() subscriberDTO: SubscriberDTO) {
    await this.dbService.DeleteSubscriber(subscriberDTO);
  }
  //#endregion
}
