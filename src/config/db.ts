import mongoose from "mongoose";

export default async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI
  if (MONGO_URI) {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  }else return new Error('Add your MongoDB URI')

}
