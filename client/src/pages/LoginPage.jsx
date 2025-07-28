import { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation BEFORE API call
    if (form.username === "" || form.password === "") {
      setError("Please enter both username and password!");
      return;
    }

    try {
      // Call login API
      const res = await loginUser({
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("username", form.username);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed! Please check your username and password."
      );
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 border border-orange-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-orange-500 mb-2 text-center">
          Login to <a href="/" style={{color: "#153a43"}}>Cinematx</a><strong>.</strong>
        </h2>
        {error && <div className="text-red-600 text-center">{error}</div>}

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
            autoComplete="username"
            required
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
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-orange-500 text-white text-lg font-extrabold hover:bg-[#153a43] cursor-pointer transition shadow-lg"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-orange-500 font-extrabold hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
