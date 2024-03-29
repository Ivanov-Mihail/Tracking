import * as mongoose from 'mongoose';

export const SubscriberSchema = new mongoose.Schema({
    role: String,
    phone: Number,
    name: String,
    latitude: Number,
    longitude: Number,
    email: String,
});