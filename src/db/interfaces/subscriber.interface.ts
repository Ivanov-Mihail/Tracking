import { Document } from 'mongoose';

export interface Subscriber extends Document {
  readonly id: number;
  readonly role: string;
  readonly phone: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly email: string;
}
