import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Point } from './interfaces/point.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { Subscription } from './interfaces/subscribtion.inteface';
import { Types } from 'mongoose';


@Injectable()
export class DbService {
  private readonly logger: Logger = new Logger('TrackingController', false);
  
  constructor(
    @InjectModel('Subscription') private subscriptionModel: Model<Subscription>,
    @InjectModel('Point') private pointModel: Model<Point>,
  ) { 
    
  }

  //#region Follow.Controller
  async getSubscription(id: string): Promise<Subscription> {
    if (typeof id === 'string') {
      if (Types.ObjectId.isValid(id)) {
        const subscriptions = await this.subscriptionModel.findById(id);
        return subscriptions;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async getSubscriptions(
    followerId: number,
    publisherId: number,
  ): Promise<Subscription[]> {
    const query: any = {};
    if (followerId) {
      query.followerId = followerId;
    }
    if (publisherId) {
      query.publisherId = publisherId;
    }
  
    const subscriptions = await this.subscriptionModel.find(query);
    return subscriptions;
  }

  async createSubscription(
    followerId: number,
    publisherId: number,
  ): Promise<Subscription> {
    const existing = await this.getSubscriptions(followerId, publisherId);

    if (existing.length > 0) {
      throw new BadRequestException('Allready existing');
    }
    if (!followerId || !publisherId) {
      throw new BadRequestException();
    }
    const subscriptionToSave = new this.subscriptionModel();
    subscriptionToSave.followerId = followerId;
    subscriptionToSave.publisherId = publisherId;
    const result = await subscriptionToSave.save();
    return result;
  }

  async deleteSubscription(id: string) {
    if (typeof id === 'undefined') {
      throw new BadRequestException();
    }
    const result = await this.subscriptionModel.deleteOne({ _id: id });
    return result;
  }
  //#endregion

  //#region Save points from users
  async SaveDriverPositions(point:Point){
    await point.save();
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
    if(result.length == 0){
      throw new NotFoundException();
    }
    return result;
  }

  //#endregion
}
