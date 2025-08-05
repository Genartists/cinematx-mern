import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import MovieList from "../components/MoviesList.jsx";
import {
  fetchMovies,
  deleteMovie,
  fetchRecommendedMovies,
} from "../api/moviesAPI.js";
import heroImage from "../assets/hero3.jpg";
import EditMovieModal from "../components/EditMovieModal.jsx";
import AddMovieModal from "../components/AddMovieModal.jsx";
import RecommendedMovies from "../components/RecommendMovieList.jsx";

function Home() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load recommendations from localStorage on component mount
  useEffect(() => {
    const savedRecommendations = localStorage.getItem("movieRecommendations");
    if (savedRecommendations) {
      try {
        const parsedRecommendations = JSON.parse(savedRecommendations);
        setRecommendations(parsedRecommendations);
      } catch (error) {
        console.error("Error parsing saved recommendations:", error);
        // If there's an error parsing, clear the invalid data
        localStorage.removeItem("movieRecommendations");
      }
    }
  }, []);

  // show movies from db
  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch((err) => console.error("Fetch movies failed:", err));
  }, []);

  const handleGetRecommend = async () => {
    try {
      setIsLoading(true);
      const recList = await fetchRecommendedMovies();
      const recommendationsToStore = recList || [];
      
      // Update state
      setRecommendations(recommendationsToStore);
      
      // Save to localStorage
      localStorage.setItem("movieRecommendations", JSON.stringify(recommendationsToStore));
    } catch (error) {
      console.error(error);
      setRecommendations([]);
      // Clear localStorage if there's an error
      localStorage.removeItem("movieRecommendations");
    } finally {
      setIsLoading(false);
    }
  };

  // add movies
  const handleMovieAdded = (newMovie) => {
    setMovies((prev) => [newMovie, ...prev]);
  };

  // delete movies
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      alert("Delete failed!");
      console.error("Error: ", err);
    }
  };

  const handleEdit = (movie) => {
    setMovieToEdit(movie);
    setOpenEditModal(true);
  };

  // update new info
  const handleMovieUpdated = (updated) => {
    setMovies((prev) =>
      prev.map((movie) => (movie._id === updated._id ? updated : movie))
    );
  };

  const handleToggleWatched = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === movieId ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("movieRecommendations"); // Clear recommendations on logout
    setUser(null);
    setMovies([]);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={user} onLogout={handleLogout} />
      <header className="w-full px-16">
        <div
          className="
            relative w-full h-150 md:min-h-[400px]
            bg-cover bg-center rounded-3xl overflow-hidden flex items-center
          "
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/68011fed23249a9699d7b42b/6807e0c24176475123a57376_noise-light.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-overlay opacity-40"
            draggable={false}
          />
          {/* Overlay */}
          <div className="absolute inset-0"></div>
          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end">
            {/* Flex container for left/right split, aligns bottom */}
            <div className="w-full flex flex-col md:flex-row justify-between items-end px-6 md:px-16 pb-12 gap-8">
              <div className="flex-1 text-left">
                <h1 className="text-white text-5xl md:text-8xl xl:text-9xl font-extrabold mb-2 drop-shadow-lg leading-[1.05]">
                  <span className="text-[#ff7c4d]">Cinematx.</span>
                </h1>
              </div>
              <div className="flex-1 text-right flex flex-col justify-end">
                <p className="text-white text-lg md:text-2xl xl:text-3xl font-medium drop-shadow max-w-xl ml-auto">
                  Discover, add, edit, and manage your favorite movies easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-10">
        <div
          className="shadow mt-18 w-full p-[5%] bg-[#f5f3ee] rounded-2xl"
          style={{
            backgroundImage:
              " linear-gradient(218deg, #ffdfe01a 48%, #efd9e399)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Watchlist
              </h1>
              <p className="text-slate-600">
                Track your favorite movies and shows
              </p>
            </div>
            <button
              class="group cursor-pointer outline-none hover:rotate-90 duration-300"
              title="Add New"
              onClick={() => setOpenAddModal(true)}
            >
              <svg
                class="stroke-[#153a43] fill-none group-active:stroke-[#ff7c4d] group-active:fill-[#ff7c4d] group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="50px"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path
                  className="group-active:stroke-white group-active:fill-white"
                  stroke-width="1.5"
                  d="M8 12H16"
                ></path>
                <path
                  className="group-active:stroke-white group-active:fill-white"
                  stroke-width="1.5"
                  d="M12 16V8"
                ></path>
              </svg>
            </button>
          </div>
          <MovieList
            movies={movies}
            handleToggleWatched={handleToggleWatched}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <EditMovieModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            movie={movieToEdit || {}}
            onMovieUpdated={handleMovieUpdated}
          />
          <AddMovieModal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            onMovieAdded={handleMovieAdded}
          />
        </div>

        <div
          className="shadow mt-18 w-full p-[5%] bg-[#f5f3ee] rounded-2xl"
          style={{
            backgroundImage:
              " linear-gradient(218deg, #ffdfe01a 48%, #efd9e399)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Picked for you
              </h1>
              <p className="text-slate-600">
                Recommended List base on your movies preferences
              </p>
            </div>

            <button
              onClick={handleGetRecommend}
              disabled={isLoading}
              className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-teal-300 hover:bg-teal-400 text-black cursor-pointer "
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Generate
                </>
              )}
            </button>
          </div>
          <RecommendedMovies movies={recommendations} isLoading={isLoading} />
        </div>
      </main>
      <footer className="mt-10"></footer>
    </div>
  );
}

export default Home;