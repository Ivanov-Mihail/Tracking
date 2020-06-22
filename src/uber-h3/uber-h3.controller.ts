import { Controller, Post } from '@nestjs/common';
import { UberH3Service } from './uber-h3.service';

@Controller('uber-h3')
export class UberH3Controller {

    constructor(private uberSvc: UberH3Service) {}

    @Post()
    CreateIndex(lat: number, lon:number, zoom:number){
        this.uberSvc.CreateIndex(lat,lon,zoom);
    }
        
}
