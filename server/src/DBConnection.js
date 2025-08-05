import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log("mongodb connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
