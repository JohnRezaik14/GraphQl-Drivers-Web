import mongoose, { Types } from 'mongoose';

export const CarSchema = new mongoose.Schema({
  name: String,
  model: Number,
  driverId: Types.ObjectId,
});
