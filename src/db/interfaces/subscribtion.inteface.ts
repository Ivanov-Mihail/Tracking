import { Document } from 'mongoose';

export interface Subscribtion extends Document {
   followerId: number;
   publisherId: number;
}
