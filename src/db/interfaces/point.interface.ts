import { Document } from 'mongoose';


export interface Point extends Document {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  direction: number;
  time: Date;
  index: string;
}
