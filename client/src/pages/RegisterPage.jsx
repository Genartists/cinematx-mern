import React, { useState } from "react";
import { registerUser } from "../api/authAPI";
import { useNavigate } from "react-router";

function Register() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match!");
      return;
    }
    if (!form.username || !form.password) {
      setError("Please fill in all fields!");
      return;
    }
    try {
      await registerUser({ username: form.username, password: form.password });
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 border border-orange-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-orange-500 mb-2 text-center">
          Create Account
        </h2>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <div>
          <label
            className="block font-semibold mb-1 text-gray-900"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Your username"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label
            className="block font-semibold mb-1 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label
            className="block font-semibold mb-1 text-gray-900"
            htmlFor="confirm"
          >
            Confirm Password
          </label>
          <input
            className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
            type="password"
            name="confirm"
            id="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-orange-500 text-white text-lg font-bold hover:bg-[#153a43] cursor-pointer transition shadow-lg"
        >
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
