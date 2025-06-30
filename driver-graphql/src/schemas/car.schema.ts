import mongoose, { Types } from 'mongoose';

export const CarSchema = new mongoose.Schema({
  name: String,
  model: String,
  driverId: String,
});
