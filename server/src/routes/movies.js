import express from "express";
import Movie from "../models/movie.js";
import authenticationToken from "../middleware/is-auth.middleware.js";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const GE_API_TOKEN = process.env.GE_API_TOKEN;
const ai = new GoogleGenAI({ apiKey: GE_API_TOKEN });

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

router.get("/recommend", authenticationToken, async (req, res) => {
  const movies = await Movie.find({ owner: req.user.userId }); // query out list of the movies that owner have

  let watchlist = movies.map((movie) => movie.name);

  if (!watchlist.length) {
    return res.status(400).json({
      error: "No movies found. Please add some movies for recommendations.",
    });
  }

  const prompt = `Given these movies the user likes: ${watchlist} . Recommend 5 more movies they might enjoy. Respond as a JSON array of objects with "title", "year", "description" just a short brief, "genres" array, "trailerURL" search accurately from youtube in format https://www.youtube.com/watch?v= their accurate id of the video.
`;

  const config = {
    tools: [{ google_search: {} }],
  };
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: config,
    });

    console.log(response.text);

    const jsonString = response.text
      .replace(/```json\n/, "")
      .replace(/\n```$/, "");

    const recommendation = JSON.parse(jsonString);

    res.json({ recommendations: recommendation });
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    res.status(500).json({ error: "Gemini API error" });
  }
});

export default router;
