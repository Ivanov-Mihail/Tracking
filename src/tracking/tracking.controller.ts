import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  ParseArrayPipe,
  BadRequestException,
} from '@nestjs/common';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { TrackingService } from './tracking.service';
import { AuthGuard } from 'cityride-auth/dist/auth/auth.guard'
import { RolesGuard } from 'cityride-auth/dist/auth/roles.guard'
import { PermissionsGuard } from 'cityride-auth/dist/auth/permissions.guard'
import { Permissions } from 'cityride-auth/dist/auth/permissions.decorator'
import { Roles } from 'cityride-auth/dist/auth/roles.decorator'
import { Usr } from 'cityride-auth/dist/auth/user.decorator'
import { isISO8601, isValidationOptions } from 'class-validator';


@Controller('tracking')
@UseGuards(RolesGuard)
@UseGuards(PermissionsGuard)
@UseGuards(AuthGuard)
export class TrackingController {
  constructor(private readonly trackingSvc:TrackingService) {
    
  }
  
  //@UsePipes(ValidationPipe)
  @Roles("driver",'client')
  @Permissions()
  @Post('locations') // localhost:3001/tracking/location
  async SaveDriverReport(@Usr() user:any, @Body('data',new ParseArrayPipe({items:GeoPointDTO})) locations: GeoPointDTO[]){
    console.log(user);
    return { data: await this.trackingSvc.SaveDriverPositions(locations, user.id) };
  }

  @Roles("driver",'client')
  @Permissions()
  @Get('locations') // localhost:3001/tracking/location
  async GetDriverPositions(@Usr() user:any, @Query('driver_id') driverId:number, @Query('start_date') startDate:string, @Query('end_date') endDate:string) {
    //v3
    if(typeof startDate !== 'undefined'){
      if(!isISO8601(startDate, isValidationOptions.apply(true))){
        throw new BadRequestException(`start_date: ${startDate} - must be a valid ISO 8601 date string `);
      }
    }  
    if(typeof endDate !== 'undefined'){
      if(!isISO8601(endDate, isValidationOptions.apply(true))){
        throw new BadRequestException(`end_date: ${endDate} - must be a valid ISO 8601 date string `);
      }
    }
   
    return { data: await this.trackingSvc.GetDriverPositions(driverId, startDate, endDate) };
    // v2
    const dbPoints =  await this.trackingSvc.GetDriverPositions(driverId, startDate, endDate);
    const temp = { data: [] };
    temp.data = dbPoints;

    return temp;
    // v1
    const dbPoints2 =  await this.trackingSvc.GetDriverPositions(driverId, startDate, endDate);
    const result:GeoPointDTO[] = [];
    for(let i = 0; i < dbPoints2.length; i++){
      result.push(await GeoPointDTO.fromDbPoint(dbPoints2[i]));
    }
    return {data:result};
  }

  // @MessagePattern('subscribtion')
  // async getSubscriptionRedis(driverId: number) : Promise<GeoPointDTO[]> {
      
  //     const points: GeoPointDTO[] = [];

  //     return points;
  // }
}
