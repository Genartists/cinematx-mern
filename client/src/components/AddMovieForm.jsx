import { useState } from "react";
import { createMovie } from "../api/moviesAPI";


function AddMovieForm({ onMovieAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    year: "",
    genres: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const data = {
      name: form.name,
      description: form.description,
      year: parseInt(form.year, 10),
      rating: parseFloat(form.rating),
      genres: form.genres
        .split(",")
        .map((g) => g.trim())
        .filter((g) => g), 
    };

    const newMovie = await createMovie(data);
    onMovieAdded(newMovie.data); 
    setForm({
      name: "",
      description: "",
      year: "",
      genres: "",
      rating: "",
    });
  } catch (err) {
    setError("Failed to add movie.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 max-w-xl mx-auto my-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-bold text-[#153a43] mb-1">Add New Movie</h3>
      {error && <div className="text-red-600">{error}</div>}

      <input
        className="p-2 border rounded"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Movie name"
        required
      />
      <input
        className="p-2 border rounded"
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        className="p-2 border rounded"
        type="number"
        name="year"
        value={form.year}
        onChange={handleChange}
        placeholder="Year"
        required
      />
      <input
        className="p-2 border rounded"
        type="text"
        name="genres"
        value={form.genres}
        onChange={handleChange}
        placeholder="Genres (comma separated)"
      />
      <input
        className="p-2 border rounded"
        type="number"
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="Rating"
        step="0.1"
        min="0"
        max="10"
      />
      <button
        type="submit"
        className="bg-[#153a43] text-white px-4 py-2 rounded-2xl font-semibold hover:bg-[#ff7c4d] hover:text-[#153a43] cursor-pointer transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}

export default AddMovieForm;
