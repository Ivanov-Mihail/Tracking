import { GeoPointDTO } from './geo_point.dto';
import { SubscriberDTO } from './subscriber.dto';

export class PublisherPositionDTO {
   id: number;
   data: GeoPointDTO;
   follower: SubscriberDTO;
}
