import mongoose from "mongoose";

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect("{URL}");
=======
    await mongoose.connect("mongodb://localhost:27017/moviedb");
>>>>>>> c584d35 (First Commit# Please enter the commit message for your changes. Lines starting)
    console.log("mongodb connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
