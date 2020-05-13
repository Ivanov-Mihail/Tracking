import { Point } from './point.interface';
import { Document } from 'mongoose';
import { Subscriber } from './subscriber.interface';

export interface Publisher extends Document {
  readonly id: number;
  readonly data: Point;
  readonly follower: Subscriber;
}
