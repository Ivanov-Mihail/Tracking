import { Point } from "../interfaces/point.interface";

// 6
export class GeoPointDTO {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  direction: number;
  time: Date;

  static async fromDbPoint(dbPoint:Point):Promise<GeoPointDTO>{
    let pointDto = new GeoPointDTO();
    pointDto.latitude = dbPoint.latitude;
    pointDto.longitude= dbPoint.longitude;
    pointDto.accuracy= dbPoint.accuracy;
    pointDto.speed= dbPoint.speed;
    pointDto.direction= dbPoint.direction;
    pointDto.time= dbPoint.phoneDate;
    return pointDto;
  }
}