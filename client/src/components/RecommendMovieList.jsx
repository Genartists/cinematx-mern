import { useState, useRef } from "react";

function MovieCard({ movie }) {
  let videoId = null;
  if (movie.trailerURL) {
    const u = new URL(movie.trailerURL);
    videoId = u.searchParams.get("v") || u.pathname.split("/").pop();
  }

  const [showVideo, setShowVideo] = useState(false);
  const timer = useRef(null);

  const handleEnter = () => {
    timer.current = setTimeout(() => setShowVideo(true), 500);
  };
  const handleLeave = () => {
    clearTimeout(timer.current);
    setShowVideo(false);
  };

  const thumb =
    movie.posterURL ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col gap-2 transition-all duration-200 hover:scale-105"
    >
      <div className="w-full h-48 bg-gray-200">
        {showVideo && videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1`}
            title={movie.title}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : thumb ? (
          <img
            src={thumb}
            alt={movie.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No trailer
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 leading-tight">
          {movie.title}
          {movie.year && (
            <span className="text-base font-normal text-gray-500">
              {" "}
              ({movie.year})
            </span>
          )}
        </h3>
        <div className="flex flex-wrap gap-2 my-2">
          {movie.genres?.map((genre) => (
            <span
              key={genre}
              className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 hover:scale-105"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Recommended Badge */}
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-lg">
            <svg
              className="w-4 h-4 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-orange-700">
              Recommended for you
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedMovies({ movies = [], isLoading }) {
  if (isLoading) {
    return (
      <div class="flex flex-col bg-neutral-200 w-56 h-64 animate-pulse justify-center mt-16 rounded-xl p-4 gap-4">
        <div class="bg-neutral-300 w-full h-32 animate-pulse rounded-md"></div>
        <div class="flex flex-col gap-2">
          <div class="bg-neutral-300 w-full h-4 animate-pulse rounded-md"></div>
          <div class="bg-neutral-300 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div class="bg-neutral-300 w-full h-4 animate-pulse rounded-md"></div>
          <div class="bg-neutral-300 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  if (!movies.length)
    return (
      <p className="text-center text-gray-500 my-10">
        No movie recommendations!
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {movies.map((m, i) => (
        <MovieCard key={i} movie={m} />
      ))}
    </div>
  );
}

export default RecommendedMovies;
