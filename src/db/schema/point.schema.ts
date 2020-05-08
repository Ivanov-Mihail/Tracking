import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  speed: { type: Number, required: false },
  direction: { type: Number, required: false },
  time: { type: Date, required: true },
  index: { type: String, required: true },
});
