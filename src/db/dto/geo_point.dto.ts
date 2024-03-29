import { Point } from '../interfaces/point.interface';
import { IsNotEmpty, IsDateString, IsDecimal, IsLatitude, IsLongitude, IsDate, IsISO8601 } from 'class-validator'

export class GeoPointDTO {

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;
  
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
  
  accuracy: number;
  speed: number;
  direction: number;
  //@IsNotEmpty()
  //@IsDate()
  //@IsDateString()
  @IsISO8601()
  time: Date;

  static async fromDbPoint(dbPoint: Point): Promise<GeoPointDTO> {
    
    const pointDto = new GeoPointDTO();

    pointDto.latitude = dbPoint.latitude;
    pointDto.longitude = dbPoint.longitude;
    pointDto.accuracy = dbPoint.accuracy;
    pointDto.speed = dbPoint.speed;
    pointDto.direction = dbPoint.direction;
    pointDto.time = dbPoint.phoneDate;

    return pointDto;
  }
}
