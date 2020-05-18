import * as mongoose from 'mongoose';

// 8
export const PointSchema = new mongoose.Schema({
  
  driverId: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  accuracy: { type: Number, required: false },
  speed: { type: Number, required: false },
  direction: { type: Number, required: false },
  phoneDate: { type: Date, required: true },
  serverDate: { type: Date, required: true },
  index: { type: String, required: false },
});
