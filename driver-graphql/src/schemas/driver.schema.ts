import mongoose, { Types } from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  name: String,
  age: Number,
  cars: [String],
});
