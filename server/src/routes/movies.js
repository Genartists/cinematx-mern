import express from "express";
import Movie from "../models/movie.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
});

router.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
