import express from "express";
import Movie from "../models/movie.js";
import authenticationToken from "../middleware/is-auth.middleware.js";
const router = express.Router();

router.get("/mine", authenticationToken, async (req, res) => {
  const movies = await Movie.find({ owner: req.user.userId });
  res.json({ data: movies });
});

router.post("/", authenticationToken, async (req, res) => {
  const { name, description, year, genres, rating } = req.body;
  const movie = new Movie({
    name,
    description,
    year,
    genres,
    rating,
    owner: req.user.userId,
  });

  await movie.save();
  res.status(201).json({ message: "Movie added successful", data: movie });
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
