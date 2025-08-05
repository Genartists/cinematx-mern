import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export async function fetchMovies() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function createMovie(movie) {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, movie, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteMovie(id) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateMovie(id, data) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchRecommendedMovies() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/recommend`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data.recommendations);
  return res.data.recommendations;
}


