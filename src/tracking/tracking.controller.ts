import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TrackingService } from './tracking.service';
import { Point } from 'src/db/interfaces/point.interface';

@UseGuards(AuthGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingSvc:TrackingService) {
    
  }

  @Post('locations') // localhost:3001/tracking/location
  @UsePipes(ValidationPipe)
  async SaveDriverReport( @Body('data') locations: GeoPointDTO[], @Body('id') id: number): Promise<Point[]>{
      console.log(locations, id)
    return await this.trackingSvc.SaveDriverPositions(locations, id);
     
  }

  @Get('locations') // localhost:3001/tracking/location
  async GetDriverPositions(@Query('driver_id') driverId:number, @Query('start_date') startDate:string, @Query('end_date') endDate:string) {
    const dbPoints =  await this.trackingSvc.GetDriverPositions(driverId, startDate, endDate);
    return dbPoints;
    //
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
