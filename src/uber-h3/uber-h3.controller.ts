import { Controller, Post, Body } from '@nestjs/common';
import { UberH3Service } from './uber-h3.service';

@Controller('uber-h3')
export class UberH3Controller {

    constructor(private uberSvc: UberH3Service) {}

    @Post()
    CreateIndex( @Body('lat') lat: number, @Body('lon') lon:number, @Body('zoom') zoom:number){
        console.log(lat, lon, zoom);
        const index = this.uberSvc.CreateIndex(lat,lon,zoom);

        console.log(index);
         return {data:index};
    }
        
}
