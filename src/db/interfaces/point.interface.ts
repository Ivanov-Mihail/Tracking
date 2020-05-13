import { Document } from 'mongoose';

// 8
export interface Point extends Document {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracy: number;
  readonly speed: number;
  readonly direction: number;
  readonly phoneDate: Date;
  serverDate: Date;
  index: string;
}
