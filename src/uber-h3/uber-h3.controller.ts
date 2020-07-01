import { Controller, Post, Body, Get } from '@nestjs/common';
import { UberH3Service } from './uber-h3.service';

@Controller('uber-h3')
export class UberH3Controller {
  constructor(private uberSvc: UberH3Service) {}

  @Post('index')
  CreateIndex(
    @Body('latitude') lat: number,
    @Body('longitude') lon: number,
    @Body('zoom') zoom: number,
  ) {
    const index = this.uberSvc.CreateIndex(lat, lon, zoom);
    return { data: { index: index } };
  }

  @Post('reverse')
  ReverseH3ToGeo(@Body('h3Index') h3Index: string) {
    const response = this.uberSvc.ReverseH3ToGeo(h3Index);
    return { data: { coordinates: response } };
  }

  @Post('distance')
  GetDistanceBetweenHexagons(
    @Body('origin') origin: string,
    @Body('destination') destination: string,
  ) {
    const response = this.uberSvc.GetDistanceBetweenHexagons(
      origin,
      destination,
    );
    return { data: { distance: response } };
  }

  @Post('neighbors')
  GetNeighbors(
    @Body('index') index: string,
    @Body('ringSize') ringSize: number,
  ) {
    console.log(index, ringSize);
    const response = this.uberSvc.GetNeighbors(index, ringSize);
    return { data: { neighborsHexagons: response } };
  }

  @Post('poligon') // Вот тут интерсно разобраться - какую фигуру можно задать координатами.
  SetPoligon(
    @Body('zoom') zoom: number,
    @Body('coordinates') coordinates: number[][],
    @Body('type') type: string,
  ) {
    const polygon = [
      [47.8133, 27.4089],
      [47.7198, 27.3544],
      [47.8151, 27.4798],
    ];

    const response = this.uberSvc.SetPoligon(coordinates, zoom);
    return { data: { poligon: response } };
  }

  @Post('multi/poligon')
  SetMultiPoligon(@Body('hexagons') hexagons) {
    const response = this.uberSvc.SetMultiPoligon(hexagons);
    return { data: { distance: response } };
  }
}
