import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as h3 from 'h3-js';
import { GeoPointDTO } from './dto/geo_point.dto';
import { Point } from './interfaces/point.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { BadRequestException, Logger } from '@nestjs/common';
import { Subscribtion } from './interfaces/subscribtion.inteface';
import { Types } from 'mongoose';
import { ClientProxyFactory } from '@nestjs/microservices/';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class DbService {
  private readonly logger: Logger = new Logger('TrackingController', false);

  client: any;

  constructor(
    @InjectModel('Subscribtion') private subscribtionModel: Model<Subscribtion>,
    @InjectModel('Point') private pointModel: Model<Point>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
      },
    });
  }

  //#region Follow.Controller
  async getSubscribtion(id: string): Promise<Subscribtion> {
    if (typeof id === 'string') {
      if (Types.ObjectId.isValid(id)) {
        const subscribtions = await this.subscribtionModel.findById(id);
        return subscribtions;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async getSubscribtions(
    followerId: number,
    publisherId: number,
  ): Promise<Subscribtion[]> {
    const query: any = {};
    if (followerId) {
      query.followerId = followerId;
    }
    if (publisherId) {
      query.publisherId = publisherId;
    }
    console.log(query);
    const subscribtions = await this.subscribtionModel.find(query);
    return subscribtions;
  }

  async createSubscribtion(
    followerId: number,
    publisherId: number,
  ): Promise<Subscribtion> {
    const existing = await this.getSubscribtions(followerId, publisherId);

    if (existing.length > 0) {
      throw new BadRequestException('Allready existing');
    }
    if (!followerId || !publisherId) {
      throw new BadRequestException();
    }
    const subscribtionToSave = new this.subscribtionModel();
    subscribtionToSave.followerId = followerId;
    subscribtionToSave.publisherId = publisherId;
    const result = await subscribtionToSave.save();
    return result;
  }

  async deleteSubscribtion(id: string) {
    if (typeof id === 'undefined') {
      throw new BadRequestException();
    }
    const result = await this.subscribtionModel.deleteOne({ _id: id });
    return result;
  }
  //#endregion

  //#region Tracking.Controller
  async SaveDriverPositions(points: GeoPointDTO[], driverid: number): Promise<Point> {
    let result: Point=null;
    let pemissionToSend = false;
    const subscribtions = await this.getSubscribtions(null, driverid);
    pemissionToSend = subscribtions.length > 0;
    for (let i = 0; i < points.length; i++) {
      const pointToSave = new this.pointModel(points[i]);
      pointToSave.index = h3.geoToH3(
        pointToSave.latitude,
        pointToSave.longitude,
        7,
      );
      pointToSave.phoneDate = points[i].time;
      pointToSave.driverId = driverid;
      pointToSave.serverDate = new Date();
      console.log(pointToSave);
      if (pemissionToSend) {
        this.PublishPosition(pointToSave, subscribtions);
      }
       result = await pointToSave.save();
      return result;
    }
  }

  async GetDriverPositions(driverId: number,startDate: string,endDate: string,): Promise<Point[]> {
    const query: any = {};
    if (typeof driverId !== 'undefined') {
      query.driverId = driverId;
    }
    const timeQuery: any = {};
    if (typeof startDate !== 'undefined' || typeof endDate !== 'undefined') {
      if (typeof startDate !== 'undefined') {
        timeQuery.$gte = startDate;
      }
      else if (typeof endDate !== 'undefined') {
        timeQuery.$lte = endDate;
      }
      query.phoneDate = timeQuery;
    }

    const result = await this.pointModel.find(query);
    return result;
  }

  private async PublishPosition(point: Point, subscribtions: Subscribtion[]) {
    console.log(typeof this.client);
    await this.client
      .emit('tracking.follower.position', {
        data: point,
        ids: subscribtions,
        from: 'tracking-service',
      })
      .toPromise();
  }
  //#endregion
}
