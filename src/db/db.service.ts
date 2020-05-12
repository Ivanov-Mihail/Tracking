import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as h3 from 'h3-js';
import { PublisherPositionDTO } from './dto/publisher-pos-dto';
import { Publisher } from './interfaces/publisher.inteface';
import { GeoPointDTO } from './dto/geo_point.dto';
import { Point } from './interfaces/point.interface';
import { SubscriberDTO } from './dto/subscriber.dto';
import { Subscriber } from './interfaces/subscriber.interface';

interface Index {
  index: string;
}

@Injectable()
export class DbService {
  constructor(
    @InjectModel('Publisher') private publisherModel: Model<Publisher>,
    @InjectModel('Point') private pointModel: Model<Point>,
    @InjectModel('Subscriber') private subscriberModel: Model<Subscriber>,
  ) {}

  private pubs: Publisher[] = [];

  async GetAllPublishers(): Promise<Publisher[]> {
    const publishers = await this.publisherModel.find().exec();
    return publishers;
  }

  async GetPublisherById(publisherId: string): Promise<Publisher> {
    const publisher = await this.publisherModel.findById(publisherId);
    return publisher;
  }

  async GetSubscribers(publisherId: string): Promise<Subscriber[]> {
    const publisher: Publisher = await this.GetPublisherById(publisherId);
    const subscribers: Subscriber[] = publisher.follower;
    return subscribers;
  }

  async AddPublsiher(publisherDTO: PublisherPositionDTO): Promise<Publisher> {
    publisherDTO.data.forEach(point => {
      point.index = h3.geoToH3(point.latitude, point.longitude, 7);
    });

    const result = await new this.publisherModel(publisherDTO).save();
    console.log(result);
    return result;
  }

  async AddPoint(point: GeoPointDTO): Promise<Point> {
    const result = await new this.pointModel(point).save();
    console.log(result);
    return result;
  }

  async AddSubscriber(subscriberDTO: SubscriberDTO) {
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
}
