import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as h3 from 'h3-js';
import { PublisherPositionDTO } from './dto/publisher-pos-dto';
import { Publisher } from './interfaces/publisher.inteface';
import { GeoPointDTO } from './dto/geo_point.dto';
import { Point } from './interfaces/point.interface';
import { SubscriberDTO } from './dto/subscriber.dto';
import { Subscriber } from './interfaces/subscriber.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(
    @InjectModel('Publisher') private publisherModel: Model<Publisher>,
    @InjectModel('Point') private pointModel: Model<Point>,
    @InjectModel('Subscriber') private subscriberModel: Model<Subscriber>,
  ) {}

  public async SavePoints(points: GeoPointDTO[], driverid: number){
   
  
    console.log(`Point's : `, points.length);

    if(typeof points.length === 'undefined' || points.length<0)
      return new BadRequestException('НЕТ массива точек.');

    for(let i =0; i< points.length; i++){   
      const pointToSave = new this.pointModel(points[i]);
      console.log(`DTO: ${JSON.stringify(pointToSave)}`);
      pointToSave.index = h3.geoToH3(pointToSave.latitude, pointToSave.longitude, 7);
      pointToSave.driverId = driverid;
      pointToSave.serverDate = new Date(Date.now());
      await pointToSave.save();
    }
  }

  async SavePublisherPosition(
    publisherDTO: PublisherPositionDTO,
  ): Promise<Publisher> {
    const result = new this.publisherModel(publisherDTO);

    result.data.index = h3.geoToH3(
      publisherDTO.data.latitude,
      publisherDTO.data.longitude,
      7,
    );

    await result.save();

    console.log(result);
    return result;
  }

  async GetAllPublishers(): Promise<Publisher[]> {
    const publishers = await this.publisherModel.find().exec();
    return publishers;
  }

  async GetPublisherById(publisherId: number): Promise<Publisher> {
    const publisher = await this.publisherModel.findOne(
      publisher => publisher.id === publisherId,
    );
    return publisher;
  }

  async GetSubscribersByPublihserId(publisherId: number): Promise<Subscriber> {
    const p: PublisherPositionDTO = new PublisherPositionDTO();
    p.id = publisherId;
    const t = new this.publisherModel(p);
    const publisher = await this.publisherModel.findOne(t);

    if (!publisher) {
      throw new NotFoundException(`User with ID "${publisher}" not found.`);
    }

    const subscribers: Subscriber = publisher.follower;
    return subscribers;
  }

  //#region

  async SaveSubscriber(subscriberDTO: SubscriberDTO) {
    const result = await new this.subscriberModel(subscriberDTO).save();
    console.log(result);
  }

  async DeleteSubscriber(subscriberDTO: SubscriberDTO) {
    const result = await new this.subscriberModel(subscriberDTO).remove();
    console.log(result);
  }

  async DeletePublisher(publisherDTO: PublisherPositionDTO) {
    const result = await new this.publisherModel(publisherDTO).remove();
    console.log(result);
  }

  ////#endregion
}
