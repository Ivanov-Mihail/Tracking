import { Injectable, BadRequestException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeoPointDTO } from 'src/db/dto/geo_point.dto';
import { Point } from 'src/db/interfaces/point.interface';
import * as h3 from 'h3-js';
import { ClientProxyFactory } from '@nestjs/microservices/';
import { Transport } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from 'src/db/interfaces/subscribtion.inteface';

@Injectable()
export class TrackingService {
    constructor(private readonly db:DbService, 
        @InjectModel('Subscription') private subscriptionModel: Model<Subscription>,
        @InjectModel('Point') private pointModel: Model<Point>){

        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
              url: process.env.REDIS_URL,
            },
        });
    }

    client: any;
    
    async SaveDriverPositions(points: GeoPointDTO[], driverId: number){
        // for(let i = 0; i < points.length; i++){
        //     await this.ValidateGeoPoint(points[i]);
        // }

    let pemissionToSend = false;
    const subscriptions = await this.db.getSubscriptions(null, driverId);
    pemissionToSend = subscriptions.length > 0;

        for (let i = 0; i < points.length; i++) {
            const pointToSave = new this.pointModel(points[i]);
            pointToSave.index = h3.geoToH3(
              pointToSave.latitude,
              pointToSave.longitude,
              7,
            );
            pointToSave.phoneDate = points[i].time;
            pointToSave.driverId = driverId;
            pointToSave.serverDate = new Date();
            //
            if (pemissionToSend) {
              this.PublishPosition(pointToSave, subscriptions);         
            }
            this.db.SaveDriverPositions(pointToSave);
        }
    }

    private async PublishPosition(point: Point, subscriptions: Subscription[]) {
        await this.client
          .emit('tracking.follower.position', {
            data: point,
            ids: subscriptions,
            from: 'tracking-service',
          })
          .toPromise();
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
