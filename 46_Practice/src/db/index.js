import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb is connected..");
  } catch (error) {
    console.log("MongoDb is not connected yet..");
    process.exit(1);
  }
};

export { connectDB };
