import mongoose from "mongoose";
import { handleError } from "../utils"

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
    
    try {
        if (cached.conn)
            return cached.conn;

        console.log(MONGODB_URI);
        if (!MONGODB_URI)
            throw new Error('URI is Missing');

        console.log("error");
        cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
            dbName: 'CEMS',
            bufferCommands: false,
        });

        console.log("error");

        cached.conn = await cached.promise;

        return cached.conn;
    } catch (error) {
        handleError(error);
    }

}