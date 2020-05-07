import { Document } from 'mongoose';

export interface Report extends Document {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  direction: number;
  time: number;
}
