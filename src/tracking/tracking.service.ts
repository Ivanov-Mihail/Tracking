import { Injectable, BadRequestException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { Point } from 'src/db/interfaces/point.interface';

@Injectable()
export class TrackingService {
    constructor(private readonly db:DbService){

    }
    
    async SaveDriverPositions(points: GeoPointDTO[], driverId: number){
        // // for(let i = 0; i < points.length; i++){
        // //     await this.ValidateGeoPoint(points[i]);
        // // }
        return await this.db.SaveDriverPositions(points, driverId)
    }

    async GetDriverPositions(driverId:number, startDate:string, endDate:string):Promise<Point[]>{
        return await this.db.GetDriverPositions(driverId, startDate, endDate);
    }

    private async ValidateGeoPoint(point:GeoPointDTO){
        if(typeof point === 'undefined' ||
            typeof point.latitude === 'undefined' || point.latitude > 90 || point.latitude < -90 ||
            typeof point.longitude === 'undefined' || point.longitude > 180 || point.longitude < -180 ||
            typeof point.accuracy === 'undefined' ||
            typeof point.speed === 'undefined' || 
            typeof point.direction === 'undefined' ||
            typeof point.time === 'undefined'){
                throw new BadRequestException(`Point ${JSON.stringify(point)} is not valid`);

        }
    }
}
