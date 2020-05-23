import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as h3 from 'h3-js';
import { PublisherPositionDTO } from './dto/publisher-pos-dto';
import { GeoPointDTO } from './dto/geo_point.dto';
import { Point } from './interfaces/point.interface';
import { SubscriberDTO } from './dto/subscriber.dto';
import { Subscriber } from './interfaces/subscriber.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Subscribtion } from './interfaces/subscribtion.inteface';

import { Types } from 'mongoose'

@Injectable()
export class DbService {
  private readonly logger: Logger = new Logger('TrackingController', false);

  constructor(
    @InjectModel('Subscribtion') private subscribtionModel: Model<Subscribtion>,
    @InjectModel('Point') private pointModel: Model<Point>,
  ) {}



  async getSubscribtions(id:string, followerId:number, publisherId:number):Promise<Subscribtion[]>{
    const query:any = {};
    if(typeof id === 'string' ){
      if(Types.ObjectId.isValid(id)){
        query._id = id
      }
      else{
        throw new BadRequestException();
      }
    }
    if(followerId){
      query.followerId = followerId
    }
    if(publisherId){
      query.publisherId = publisherId
    }
    console.log(query);
    const subscribtions = await this.subscribtionModel.find(query);
    return subscribtions;
  }


  async createSubscribtion(followerId:number, publisherId:number):Promise<Subscribtion>{
    const existing = await this.getSubscribtions(null ,followerId, publisherId);
    if(existing){
      throw "Allready exsisting subscribtion"
    }
    if(!followerId || !publisherId){
      throw new BadRequestException();
    }
    const subscribtionToSave = new this.subscribtionModel();
    subscribtionToSave.followerId = followerId;
    subscribtionToSave.publisherId = publisherId;
    const result = await subscribtionToSave.save();
    return result;
  }


  async deleteSubscribtion(id:string){
    if(id){
      throw new BadRequestException();
    }
    const result = await this.subscribtionModel.deleteOne({_id:id})
    return result;
  }



  public async SavePoints(points: GeoPointDTO[], driverid: number) {
    try {

      if (typeof points !== 'object' || typeof points.length === 'undefined') {
        throw new BadRequestException(
          points,
          "Received 'message' is undefined.",
        );
      }
      for (let i = 0; i < points.length; i++) {
        const pointToSave = new this.pointModel(points[i]);
        console.log(`DTO: ${JSON.stringify(pointToSave)}`);
        pointToSave.index = h3.geoToH3(
          pointToSave.latitude,
          pointToSave.longitude,
          7,
        );
        pointToSave.driverId = driverid;
        pointToSave.serverDate = new Date(Date.now());
        await pointToSave.save();
      }
    } catch (ex) {
      this.logger.warn('s', ex);
    }
  }

  async GetAllPublishers(): Promise<GeoPointDTO[]> {
    const points = await this.pointModel.find().exec();
    const t: GeoPointDTO[] = points;
    return t;
  }

  async GetPublishersByTime(
    startTime: string,
    endTime: string,
  ): Promise<GeoPointDTO[]> {
    const startDate: Date = new Date(startTime);
    const endDate: Date = new Date(endTime);

    console.log('');
    console.log('---------------------', startDate);
    console.log('---------------------', endDate);

    const publishers: Point[] = await this.pointModel.find();

    return publishers;
  }

  // async SavePublisherPosition(publisherDTO: PublisherPositionDTO,): Promise<Publisher> {
  //   const result = new this.publisherModel(publisherDTO);
  //   result.data.index = h3.geoToH3(
  //     publisherDTO.data.latitude,
  //     publisherDTO.data.longitude,
  //     7,
  //   );

  //   await result.save();

  //   console.log(result);
  //   return result;
  // }

  async GetPublisherById(publisherId: number): Promise<GeoPointDTO> {
    const publisher = await this.pointModel.findOne({driverId:publisherId});
    return publisher;
  }

  // async GetSubscribersByPublihserId(publisherId: number): Promise<Subscriber> {
  //   const p: PublisherPositionDTO = new PublisherPositionDTO();
  //   p.id = publisherId;
  //   const t = new this.publisherModel(p);
  //   const publisher = await this.publisherModel.findOne(t);

  //   if (!publisher) {
  //     throw new NotFoundException(`User with ID "${publisher}" not found.`);
  //   }

  //   const subscribers: Subscriber = publisher.follower;
  //   return subscribers;
  // }

  //#region

  // async SaveSubscriber(subscriberDTO: SubscriberDTO) {
  //   const result = await new this.subscriberModel(subscriberDTO).save();
  //   console.log(result);
  // }

  // async DeleteSubscriber(subscriberDTO: SubscriberDTO) {
  //   const result = await new this.subscriberModel(subscriberDTO).remove();
  //   console.log(result);
  // }

  // async DeletePublisher(publisherDTO: PublisherPositionDTO) {
  //   const result = await new this.publisherModel(publisherDTO).remove();
  //   console.log(result);
  // }

  ////#endregion
}
