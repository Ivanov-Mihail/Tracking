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
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(
    @InjectModel('Publisher') private publisherModel: Model<Publisher>,
    @InjectModel('Point') private pointModel: Model<Point>,
    @InjectModel('Subscriber') private subscriberModel: Model<Subscriber>,
  ) {}

  public async SavePoint(point: GeoPointDTO): Promise<Point> {
    console.log(`received DTO: ${JSON.stringify(point)}\n`);
    const pointDoc = new this.pointModel(point);
    console.log(`parse in MODEL: ${JSON.stringify(pointDoc)}\n`);

    pointDoc.index = h3.geoToH3(pointDoc.latitude, pointDoc.longitude, 7);

    pointDoc.serverDate = new Date(Date.now());

    console.log(`filled 2 fields: ${JSON.stringify(pointDoc)}\n`);

    const result = await pointDoc.save();

    console.log(`saved Mongo Model: ${JSON.stringify(result)}\n`);

    return result;
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
