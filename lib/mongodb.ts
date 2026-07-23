// lib/mongodb.ts
import mongoose, { Connection } from "mongoose";

/**
 * Interface describing our cached connection object.
 * This ensures we avoid multiple connections in development.
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend Node.js global type to include our cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Initialize the cache if it doesn't exist.
 * In development, Next.js hot reload can cause multiple connections,
 * so we store the connection in a global variable.
 */
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

/**
 * Connect to MongoDB using Mongoose.
 * Uses environment variable MONGODB_URI for connection string.
 */
export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    // Return existing connection if already established
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable in .env.local");
    }

    // Create new connection promise
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false, // Disable mongoose buffering
    });
  }

 try {
  // Await the connection and store it
  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;
} catch (err) {
  // Reset cached.promise so future calls can retry
  cached.promise = null;
  throw err;
}

  return cached.conn;
}
