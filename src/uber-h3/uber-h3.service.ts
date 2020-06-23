import { Injectable } from '@nestjs/common';
import * as h3 from 'h3-js';

@Injectable()
export class UberH3Service {

    CreateIndex( lat: number, lon:number, zoom:number){    
        const index: string = h3.geoToH3(lat, lon, zoom);
        console.log(index);
        return index;
    }
}
