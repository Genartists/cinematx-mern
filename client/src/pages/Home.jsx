import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import MovieList from "../components/MoviesList.jsx";
import { fetchMovies } from "../api/moviesAPI.js";
import AddMovieForm from "../components/AddMovieForm.jsx";
import heroImage from "../assets/hero3.jpg"
function Home() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch((err) => console.error("Fetch movies failed:", err))
  }, []);

  const handleMovieAdded = (newMovie) => {
    setMovies((prev) => [newMovie, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={() => setUser(null)} />
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
        <AddMovieForm onMovieAdded={handleMovieAdded} />

        <div className="shadow mt-18 w-full p-[5%] bg-[#f5f3ee] rounded-2xl" style={{backgroundImage: " linear-gradient(218deg, #ffdfe01a 48%, #efd9e399)"}}>
          <h2 className="text-2xl font-bold text-[#153a43] mb-6">
          Movies
          </h2>
          <MovieList movies={movies} />
        </div>
        
      </main>
      <footer className="mt-10"></footer>
    </div>
  );
}

export default Home;
