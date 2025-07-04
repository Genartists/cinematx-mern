import React, { useRef, useEffect } from "react";
import AddMovieForm from "./AddMovieForm";

function AddMovieModal({ open, onClose, onMovieAdded }) {
  const overlayRef = useRef();

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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition"
    >
      <div className="bg-white rounded-xl shadow-xl p-6 relative max-w-md w-full">
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <AddMovieForm
          onMovieAdded={(movie) => {
            onMovieAdded(movie);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default AddMovieModal;
