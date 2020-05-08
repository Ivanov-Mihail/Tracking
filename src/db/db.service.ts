import { Injectable, Body } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as h3 from 'h3-js';
import { PublisherPositionDTO } from './dto/publisher-pos-dto';
import { Publisher } from './interfaces/point.interface';

interface Index {
  index: string;
}

@Injectable()
export class DbService {
  constructor(
    @InjectModel('Publisher') private reportModel: Model<Publisher>,
  ) {}

  // не знаю как будет работать Асинхронность.
  // преобазование DTO в Модель
  private async parseGeoPointToH3(
    publisherPosition: PublisherPositionDTO,
  ): Promise<PublisherPositionDTO> {
    const temp: PublisherPositionDTO & Index = Object.assign(
      { index: 'asd' },
      publisherPosition,
    );

    temp.data.forEach(point => {
      // тут должно появится поле индекс
      point.index = h3.geoToH3(point.latitude, point.longitude, 7);
    });

    return publisherPosition;
  }

  async saveReport(@Body() publisherPosition: PublisherPositionDTO) {
    const preparedToSave = await this.parseGeoPointToH3(publisherPosition);

    console.log(preparedToSave);
    const newrep = new this.reportModel(preparedToSave);
    const result = await newrep.save();
    console.log(result);
  }

  // async getAllReportByUser(@Body() reportDto: GeoPointDTO): Promise<Report> {
  //return this.reportModel.find(r=> this.reportModel === ).exec();
  //   return null;
  // }
}
