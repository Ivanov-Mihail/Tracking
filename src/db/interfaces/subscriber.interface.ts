import { Document } from 'mongoose';

export interface Subscriber extends Document {
    id: number;
    latitude: number;
    longitude: number;
    accuracy: number;
    speed: number;
    direction: number;
    time: Date;
    index: string;
  }
  