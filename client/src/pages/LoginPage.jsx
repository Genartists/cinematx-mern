import { useState, useRef, useEffect } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router";

function Eye({ isRightEye = false }) {
  const eyeRef = useRef(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // Set default positions - start with pupils centered
  const defaultPosition = { x: 0, y: 0 };

  useEffect(() => {
    setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
  }, [defaultPosition.x, defaultPosition.y]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;

      // Get eye position and dimensions
      const eye = eyeRef.current;
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Calculate direction vector from eye to mouse
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;

      // Calculate the distance from eye center to mouse
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate the eye radius and max pupil movement
      const eyeRadius = eyeRect.width / 2;
      const pupilRadius = 19; // Half of the pupil size (38px/2)
      const maxMovement = eyeRadius - pupilRadius - 8; // Buffer to ensure pupil stays inside

      // If distance is very small, return to default position
      if (distance < 1) {
        setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
        return;
      }

      // Normalize the direction vector
      let nx = dx / distance;
      let ny = dy / distance;

      // Apply the max movement constraint
      let moveX = Math.min(distance, maxMovement) * nx;
      let moveY = Math.min(distance, maxMovement) * ny;

      // Additional constraint check to ensure pupil stays inside eye
      const totalDistance = Math.sqrt(moveX * moveX + moveY * moveY);

      if (totalDistance > maxMovement) {
        const scale = maxMovement / totalDistance;
        moveX = moveX * scale;
        moveY = moveY * scale;
      }

      setPupilPosition({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [defaultPosition.x, defaultPosition.y]);

  return (
    <div
      ref={eyeRef}
      className="relative shrink-0 size-[70px] rounded-full bg-[#FBF0DC] overflow-hidden"
      data-name="eye"
    >
      {/* White eye background */}
      <div className="absolute inset-[6px] rounded-full" />

      {/* Pupil */}
      <div
        className="absolute bg-[#153a43] rounded-full size-[38px]"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        }}
      />
    </div>
  );
}

function Eyes() {
  return (
    <div className="relative shrink-0" data-name="eyes">
      <div className="flex flex-row gap-4 items-center justify-center">
        <Eye isRightEye={false} />
        <Eye isRightEye={true} />
      </div>
    </div>
  );
}

// Blue bar with two eyes
function MonsterEyesBar() {
  return (
    <div className="bg-[#ff7c4d] h-[160px] w-full rounded-t-2xl flex items-center justify-center relative">
      <Eyes />
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const monsterRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.username === "" || form.password === "") {
      setError("Please enter both username and password!");
      return;
    }
    try {
      await loginUser({
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
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-2">
      <div
        ref={monsterRef}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <MonsterEyesBar />
        <form
          className="w-full flex flex-col gap-6 px-8 py-8 items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-extrabold text-[#153a43] mb-1 text-center tracking-tight">
            Login to <span className="text-[#ff7c4d]">Cinematx</span>
          </h2>
          {error && (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          <div className="w-full">
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
          <div className="w-full">
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
            className="w-full py-3 rounded-full bg-[#ff7c4d] text-white text-lg font-extrabold hover:bg-[#153a43]  hover:text-white cursor-pointer transition shadow-lg"
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-[#ff7c4d] font-extrabold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
