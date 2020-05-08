import * as mongoose from 'mongoose';
import { PointSchema } from './point.schema';

export const PublisherSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  data: [PointSchema],
});
