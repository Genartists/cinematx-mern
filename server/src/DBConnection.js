import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const connectDB = async () => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    await mongoose.connect("{URL}");
=======
    await mongoose.connect("mongodb://localhost:27017/moviedb");
>>>>>>> c584d35 (First Commit# Please enter the commit message for your changes. Lines starting)
=======
    await mongoose.connect(process.env.MONGO_URI);
>>>>>>> 369b3f5 (update features)
    console.log("mongodb connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
