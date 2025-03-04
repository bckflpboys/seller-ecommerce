import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection | undefined;
}

const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    console.log('Connecting to MongoDB...');
    try {
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
    } catch (error) {
      console.error('Error creating MongoDB connection promise:', error);
      throw error;
    }
  }

  try {
    console.log('Awaiting MongoDB connection...');
    cached.conn = await cached.promise;
    console.log('Successfully connected to MongoDB');
  } catch (e: any) {
    console.error('Error connecting to MongoDB:', e);
    cached.promise = null;
    throw new Error(`MongoDB connection error: ${e.message}`);
  }

  return cached.conn;
}

export default dbConnect;
