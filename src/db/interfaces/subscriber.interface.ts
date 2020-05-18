import { Document } from 'mongoose';

export interface Subscriber extends Document {
   id: number;
   role: string;
   phone: number;
   name: string;
   latitude: number;
   longitude: number;
   email: string;
}
