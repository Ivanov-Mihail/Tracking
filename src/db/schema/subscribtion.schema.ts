import * as mongoose from 'mongoose';

export const SubscribtionSchema = new mongoose.Schema({
  followerId: { type: Number, required: true },
  publisherId: { type: Number, required: true },
});
