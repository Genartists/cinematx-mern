import express from "express";
import cors from "cors";
import connectDB from "./DBConnection.js";
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

connectDB();

app.use("/api/movies", movieRoutes);
app.use("/api/auth", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:5000");
});
