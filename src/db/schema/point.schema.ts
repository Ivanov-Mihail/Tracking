import * as mongoose from 'mongoose';

// 8
export const PointSchema = new mongoose.Schema({
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  accuracy: { type: Number, required: false },
  speed: { type: Number, required: false },
  direction: { type: Number, required: false },
  phoneDate: { type: Date, required: false },
  serverDate: { type: Date, required: false },
  index: { type: String, required: false },
});
