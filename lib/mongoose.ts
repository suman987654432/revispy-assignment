import mongoose from 'mongoose';

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache ?? { conn: null, promise: null };

global.mongooseCache = global.mongooseCache ?? cached;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
      serverApi: {
        version: '1' as const,
        strict: true,
        deprecationErrors: true,
      },
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URL, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        mongoose.set('strictQuery', true);
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection failed:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  cached.promise = null;
});