import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
    if (cached.conn)
        return cached.connect;

    if (!DB_URI)
        throw new Error('URI is Missing');

    cached.promise = cached.promise || mongoose.connect(DB_URI, {
        dbName: 'CEMS',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;

    return cached.conn;
}