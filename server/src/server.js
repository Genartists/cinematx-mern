import express from "express";
import cors from "cors";
import connectDB from "./DBConnection.js"; 
import movieRoutes from "./routes/movies.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/movies", movieRoutes);
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:5000");
});
