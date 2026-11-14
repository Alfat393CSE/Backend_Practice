import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
    );
    console.log(`MongoDb is connected on: ${mongoInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB is not connected yet...");
    process.exit(1);
  }
};

export { connectDB };
