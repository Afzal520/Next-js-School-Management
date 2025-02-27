import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL
console.log(MONGODB_URL, "heelooo")
if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URI  .env"
    );
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {

            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDB