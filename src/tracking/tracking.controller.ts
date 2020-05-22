import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Logger,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PublisherPositionDTO } from 'src/db/dto/publisher-pos-dto';
import { Publisher } from 'src/db/interfaces/publisher.inteface';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { SubscriberDTO } from 'src/db/dto/subscriber.dto';
import { Subscriber } from 'src/db/interfaces/subscriber.interface';
import { AuthService } from 'cityride-auth/dist/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly dbService: DbService,
    private readonly authSvc: AuthService,
  ) {}

  private readonly timeNow: Date = new Date(Date.now());
  private readonly logger: Logger = new Logger('TrackingController', false);

  @Post('location') // localhost:3001/tracking/location
  async SavePoint( @Body('data') locations: GeoPointDTO[], @Body('id') id: number,) {
    try {
      await this.dbService.SavePoints(locations, id);
      this.logger.log(`Driver №` + id, `Location successfully saved!`);
      return { answer: `Driver № ${id} Location successfully saved!` };

    } catch (e) {
      return {
        exception: `${new BadRequestException(locations, 'Exception')}`,
      };
    }
  }

  @Get('location') // localhost:3001/tracking/location
  async GetAllPublishers(): Promise<GeoPointDTO[]> {
    return this.dbService.GetAllPublishers();
  }

  @Get('/:id') // localhost:3001/tracking/publisher/?id=21
  async GetPublisherPositionById(@Param('id') id: number): Promise<GeoPointDTO> {
    this.logger.log(`Request GET: publisher/${id} - ${this.timeNow}`);
    return this.dbService.GetPublisherById(id);
  }


  @Get('location/:startTime/:endTime') // localhost:3001/tracking/location
  async GetPublishersByTime(
    @Param('startTime') startTime: string,
    @Param('endTime') endTime: string,
  ): Promise<GeoPointDTO[]> {

    return await this.dbService.GetPublishersByTime(startTime,endTime);

  }

  /* ------------------------------------------------------------------------------- */

  @Post('/publisher') //localhost:3001/tracking/publisher
  async SavePublisherPosition(@Body() publisher: PublisherPositionDTO) {
    await this.dbService.SavePublisherPosition(publisher);
  }

  //#region  --------------------------------------------------------------------------

  // @Post('/point') //localhost:3001/tracking/point
  // async CreatePoint(@Body() point: GeoPointDTO) {
  //   await this.dbService.SavePoints(point[]).then();
  //   console.log();
  // }

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
