import React, { useState, useRef, useEffect } from "react";
import { createMovie } from "../api/moviesAPI";

function AddMovieModal({ open, onClose, onMovieAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    year: "",
    genres: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const overlayRef = useRef();

  // Reset form mỗi lần mở
  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        description: "",
        year: "",
        genres: "",
        rating: "",
      });
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [open]);

  // Đóng modal khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = {
        ...form,
        year: parseInt(form.year, 10),
        rating: parseFloat(form.rating),
        genres: form.genres
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean),
      };
      const result = await createMovie(data);
      onMovieAdded(result.data);
      onClose();
    } catch (err) {
      setError("Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className={
        "fixed inset-0 z-50 flex items-center justify-center transition-all " +
        (show
          ? "bg-white/30 backdrop-blur-sm"
          : "bg-white/0 backdrop-blur-none")
      }
      style={{ transition: "background 0.4s" }}
    >
      <div
        className={
          "bg-white rounded-xl shadow-xl p-6 relative max-w-md w-full transform transition-all duration-300 " +
          (show
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-10")
        }
      >
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        {error && <div className="text-red-600">{error}</div>}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-extrabold text-orange-500 mb-2">
            Add Movie
          </h3>
          <div>
            <label
              className="block font-semibold text-gray-900 mb-1"
              htmlFor="name"
            >
              Movie Name
            </label>
            <input
              className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter movie name"
              required
            />
          </div>
          <div>
            <label
              className="block font-semibold text-gray-900 mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition resize-none min-h-[60px] placeholder:text-gray-400 bg-orange-50"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              maxLength={300}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block font-semibold text-gray-900 mb-1"
                htmlFor="year"
              >
                Year
              </label>
              <input
                className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
                type="number"
                name="year"
                id="year"
                value={form.year}
                onChange={handleChange}
                placeholder="Year"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block font-semibold text-gray-900 mb-1"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
                type="number"
                name="rating"
                id="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="Rating"
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          </div>
          <div>
            <label
              className="block font-semibold text-gray-900 mb-1"
              htmlFor="genres"
            >
              Genres
            </label>
            <input
              className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition placeholder:text-gray-400 bg-orange-50"
              type="text"
              name="genres"
              id="genres"
              value={form.genres}
              onChange={handleChange}
              placeholder="E.g. Animation, Drama"
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-full font-semibold bg-white border border-orange-200 cursor-pointer text-orange-500 hover:bg-orange-50 transition shadow"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2 rounded-full font-extrabold bg-orange-500 text-white cursor-pointer hover:bg-orange-400 transition shadow-lg"
              disabled={loading}
            >
              {loading ? "Adding..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovieModal;
