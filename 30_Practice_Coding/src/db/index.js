import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected...");
  } catch (error) {
    console.log("MongoDb is not connected yet", error);
    process.exit(1);
  }
};

export { connectDB };
