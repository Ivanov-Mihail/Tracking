import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { TrackingService } from './tracking.service';
import { Point } from 'src/db/interfaces/point.interface';
import { AuthGuard } from 'cityride-auth/dist/auth/auth.guard'
import { RolesGuard } from 'cityride-auth/dist/auth/roles.guard'
import { PermissionsGuard } from 'cityride-auth/dist/auth/permissions.guard'
import { Permissions } from 'cityride-auth/dist/auth/permissions.decorator'
import { Roles } from 'cityride-auth/dist/auth/roles.decorator'
import { Usr } from 'cityride-auth/dist/auth/user.decorator'


@Controller('tracking')
@UseGuards(RolesGuard)
@UseGuards(PermissionsGuard)
@UseGuards(AuthGuard)
export class TrackingController {
  constructor(private readonly trackingSvc:TrackingService) {
    
  }
  
  //@UsePipes(ValidationPipe)
  @Roles("driver",'client')
  @Permissions("read")
  @Post('locations') // localhost:3001/tracking/location
  async SaveDriverReport(@Usr() user:any, @Body('data',new ParseArrayPipe({items:GeoPointDTO})) locations: GeoPointDTO[]): Promise<Point[]>{
    console.log(user);
    return await this.trackingSvc.SaveDriverPositions(locations, user.id);     
  }

  @Roles("driver",'client')
  @Permissions()
  @Get('locations') // localhost:3001/tracking/location
  async GetDriverPositions(@Usr() user:any, @Query('driver_id') driverId:number, @Query('start_date') startDate:string, @Query('end_date') endDate:string) {
    const dbPoints =  await this.trackingSvc.GetDriverPositions(user.id, startDate, endDate);
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
