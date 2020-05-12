import { Point } from "./point.interface";
import { Document } from 'mongoose';
import { Subscriber } from "./subscriber.interface";

export interface Publisher extends Document {
    id: number;
    data: Point[];
    follower: Subscriber[];
  }
  