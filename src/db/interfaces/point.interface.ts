import { Document } from 'mongoose';

export interface Publisher extends Document {
  id: number;
  data: Point[];
}

export interface Point extends Document {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  direction: number;
  time: Date;
  index: string;
}
