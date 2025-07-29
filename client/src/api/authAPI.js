import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export async function registerUser({ username, password }) {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data;
}

export async function loginUser({ username, password }) {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", res.data.data.token);
  return res.data;
}