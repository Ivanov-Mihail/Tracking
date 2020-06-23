import { Injectable } from '@nestjs/common';
import * as h3 from 'h3-js';

@Injectable()
export class UberH3Service {

    CreateIndex( lat: number, lon:number, zoom:number){    
        return h3.geoToH3(lat, lon, zoom);
    }
}
