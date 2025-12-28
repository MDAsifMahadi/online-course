import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

// Prevent multiple connections in dev / hot reload
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                bufferCommands: false,
            })
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
