import { Document } from 'mongoose';

export interface Subscription extends Document {
   followerId: number;
   publisherId: number;
}
