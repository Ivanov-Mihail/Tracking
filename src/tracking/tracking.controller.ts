import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TrackingService } from './tracking.service';

@UseGuards(AuthGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingSvc:TrackingService) {
    
  }

  @Post('locations') // localhost:3001/tracking/location
  async SaveDriverReport( @Body('data') locations: GeoPointDTO[], @Body('id') id: number){
      console.log(locations, id)
      await this.trackingSvc.SaveDriverPositions(locations, id);
  }

  @Get('locations') // localhost:3001/tracking/location
  async GetDriverPositions(@Query('driver_id') driverId:number, @Query('start_date') startDate:string, @Query('end_date') endDate:string) {
    const dbPoints =  await this.trackingSvc.GetDriverPositions(driverId, startDate, endDate);
    const result:GeoPointDTO[] = [];
    for(let i = 0; i < dbPoints.length; i++){
      result.push(await GeoPointDTO.fromDbPoint(dbPoints[i]));
    }
    return {data:result};
  }


  
  // @MessagePattern('subscribtion')
  // async getSubscribtionRedis(driverId: number) : Promise<GeoPointDTO[]> {
      
  //     const points: GeoPointDTO[] = [];
      
  //     console.log(`: ${'as'}`);

  //     return points;
  // }
}
