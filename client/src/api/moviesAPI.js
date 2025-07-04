import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export async function fetchMovies() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createMovie(movie) {
  const res = await axios.post(API_URL, movie);
  return res.data;
}

// export async function deleteMovie(id) {
//   const res = await axios.delete(`${API_URL}/${id}`);
//   return res.data;
// }