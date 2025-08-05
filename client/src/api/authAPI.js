import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

export async function registerUser({ username, password }) {
  const res = await axios.post(`${BASE_URL}/register`, { username, password });
  return res.data;
}

export async function loginUser({ username, password }) {
  const res = await axios.post(`${BASE_URL}/login`, { username, password });
  localStorage.setItem("token", res.data.data.token);
  return res.data;
}
