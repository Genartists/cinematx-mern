import React from "react";

function Navbar({ user, onLogout }) {
  return (
    <nav className="flex items-center justify-between px-16 text-[#153a43] h-18">
      <div className="font-extrabold text-2xl cursor-pointer tracking-wide"><a href="/Home">Cinematx</a><strong className="text-[#ff7c4d]">.</strong></div>
      <ul className="flex gap-6 font-semibold">
        <li><a href="/" className="hover:text-[#ff7c4d]">Home</a></li>
        <li><a href="/about" className="hover:text-[#ff7c4d]">About</a></li>
        <li><a href="/movies" className="hover:text-[#ff7c4d]">Movies</a></li>
      </ul>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">👤 {user.name}</span>
            <button onClick={onLogout} className="px-3 py-1 rounded bg-[#ff7c4d] text-gray-900 font-semibold hover:bg-yellow-300 transition">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="px-4 py-1 rounded-4xl bg-[#ff7c4d] hover:bg-[#153a43] font-semibold hover:text-white transition">Login</a>
            <a href="/register" className="px-3 py-1 rounded-4xl bg-[#ff7c4d] hover:bg-[#153a43] font-semibold hover:text-white transition">Register</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
