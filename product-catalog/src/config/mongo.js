import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(config.mongoUri, { autoIndex: true });
  return mongoose.connection;
}
