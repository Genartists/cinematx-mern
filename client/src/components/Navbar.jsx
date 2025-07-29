import { Link } from "react-router";

function Navbar({ username, onLogout }) {
  return (
    <nav className="flex items-center justify-between px-16 text-[#153a43] h-18">
      <div className="font-extrabold text-2xl cursor-pointer tracking-wide">
        <a href="/Home">Cinematx</a>
        <strong className="text-[#ff7c4d]">.</strong>
      </div>
      <div className="flex items-center gap-4">
        {username ? (
          <>
            <span className="font-semibold">Welcome, {username}!</span>
            <button
              onClick={onLogout}
              className="px-4 py-1 rounded-4xl bg-[#ff7c4d] hover:bg-[#153a43] font-bold hover:text-white cursor-pointer transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-1 rounded-4xl bg-[#ff7c4d] hover:bg-[#153a43] font-bold hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 rounded-4xl bg-[#ff7c4d] hover:bg-[#153a43] font-bold hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
