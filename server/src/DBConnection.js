import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("{URL}");
    console.log("mongodb connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
