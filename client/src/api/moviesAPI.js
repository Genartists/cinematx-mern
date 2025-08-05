import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL + "/api/movies";

export async function fetchMovies() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function createMovie(movie) {
  const token = localStorage.getItem("token");
  const res = await axios.post(BASE_URL, movie, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteMovie(id) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateMovie(id, data) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchRecommendedMovies() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/recommend`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data.recommendations);
  return res.data.recommendations;
}
