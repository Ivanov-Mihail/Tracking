import { Document } from 'mongoose';

// 8
export interface Point extends Document {
  driverId:number;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  direction: number;
  phoneDate: Date;
  serverDate: Date;
  index: string;
}
