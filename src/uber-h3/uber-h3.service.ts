import { Injectable, Logger } from '@nestjs/common';
import * as h3 from 'h3-js';
import { handleRetry } from '@nestjs/mongoose/dist/common/mongoose.utils';

@Injectable()
export class UberH3Service {
  // CR-505 [NODE] H3 web service
  // Базовое создание индекса
  CreateIndex(lat: number, lon: number, zoom: number) {
    return h3.geoToH3(lat, lon, zoom);
  }

  // Обратный геокодиг из "клетки" в координаты
  ReverseH3ToGeo(h3Index: string) {
    const position: number[] = h3.h3ToGeo(h3Index);
    return position;
  }

  // Расстояние между "клетками"
  GetDistanceBetweenHexagons(origin: string, destination: string) {
    const distance: number = h3.h3Distance(origin, destination);
    return distance;
  }

  // CR-505 [NODE] H3 web service
  // Получить ближайшие клетки
  // Пользователь - загрузив свою локацию - делает подзапрос - для получения соседених локаций
  // Тем самым можно делать быстрое сопоставление - чтобы найти ближайших - водителей или клиентов
  GetNeighbors(index: string, step: number) {
    const indexNeighbors: string[] = h3.kRing(index, step);
    return indexNeighbors;
  }

  // Полигон это масcив словарей(масивов)
  //  [ [47.22, 28.55 ], [47.35, 28.50], [47.30, 28.45] ]
  SetPoligon(polygon: number[][], zoom: number) {
    console.log('-------------------------- POLYFILL');
    const hexagons = h3.polyfill(polygon, zoom, true);

    console.log(hexagons.length);
    console.log(hexagons);

    if (hexagons.length > 1000) {
      let counter = 0;
      if (counter % 1000 == 0) {
        counter++;
      }
    }

    // let page: number;
    // for(let i = 1000; i>0; i--){
    //   hexagons[i]
    // }

    return hexagons;
  }

  SetMultiPoligon(hexagons) {
    console.log(hexagons);
    const coordinates = h3.h3SetToMultiPolygon(hexagons, true);

    // -> [[[
    //      [-122.37681938644465, 37.76546768434345],
    //      [-122.3856345540363, 37.776004200673846],
    //      ...
    //    ]]]

    return coordinates;
  }

  GetParentIndex(h3Index:string, zoom: number) {
    const parentIndex = h3.h3ToParent(h3Index, zoom);
    return parentIndex;
  }
}
