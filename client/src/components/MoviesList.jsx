import { Link } from "react-router";
function RatingMood({ rating }) {
  const num = Number(rating);
  if (Number.isNaN(num)) return null;

  // Normalize to a 0–100 scale
  const score100 = num > 10 ? num : num * 10;

  let color = "bg-red-500",
    ring = "ring-red-200",
    face = "sad",
    label = "Low";
  if (score100 >= 80) {
    color = "bg-green-500";
    ring = "ring-green-200";
    face = "smile";
    label = "Great";
  } else if (score100 >= 60) {
    color = "bg-orange-400";
    ring = "ring-orange-200";
    face = "neutral";
    label = "Okay";
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded-full ${color} ring-2 ${ring} grid place-items-center text-white`}
        title={`${label} (${num})`}
        aria-label={`Rating ${num} ${label}`}
      >
        {/* Face icon */}
        {face === "smile" && (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <circle cx="9" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
            <path
              d="M8 14c1.2 1.6 2.8 2.4 4 2.4s2.8-.8 4-2.4"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}
        {face === "neutral" && (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <circle cx="9" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
            <path
              d="M8 15h8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        {face === "sad" && (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <circle cx="9" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
            <path
              d="M8 17c1.2-1.6 2.8-2.4 4-2.4s2.8.8 4 2.4"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <span className="text-slate-700 font-semibold">{num}/10</span>
    </div>
  );
}

// render movies was fetched
function MovieList({ movies, onDelete, onEdit, handleToggleWatched }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {movies.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No movies found!
        </p>
      ) : (
        movies.map((movie) => (
          <div
            className="group relative hover:scale-108 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 -translate-y-4 group-hover:translate-y-0 transition-all duration-200"
            key={movie._id}
          >
            <div className="flex flex-col gap-2 absolute top-2 right-2 z-10">
              {/* Delete button */}
              <button
                className="w-6 h-6 bg-[#FD354C] text-white rounded-full shadow cursor-pointer hover:bg-red-600 transition-all duration-300 text-sm opacity-0 group-hover:opacity-100 grid place-items-center font-extrabold"
                style={{ lineHeight: "0" }}
                title="Delete"
                onClick={() => onDelete(movie._id)}
              >
                <span className="relative bottom-0.5">×</span>
              </button>

              {/* Edit button */}
              <button
                className="w-6 h-6 bg-[#3480EA] text-white rounded-full shadow cursor-pointer hover:bg-blue-600 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center font-extrabold"
                title="Edit"
                onClick={() => onEdit(movie)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 font-extrabold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            <h3 className="font-bold text-lg text-slate-800 leading-tight">
              {movie.name}{" "}
              <span className="text-base font-normal text-gray-500">
                ({movie.year})
              </span>
            </h3>
            <p className="text-gray-700 truncate max-w-10/12">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-2 my-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-[#9CE53E] text-[#245313] px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 hover:scale-105"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto">
              <RatingMood rating={movie.rating} />

              {/* Watch toggle button - bottom right */}
              <div className="flex items-center gap-2">
                {movie.watched && (
                  <span className="text-green-600 text-sm font-medium transition-all duration-500">
                    Watched
                  </span>
                )}
                <button
                  className={`w-6 h-6 rounded-full shadow cursor-pointer transition-all duration-300 grid place-items-center ${
                    movie.watched
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  title={
                    movie.watched ? "Mark as unwatched" : "Mark as watched"
                  }
                  onClick={() => handleToggleWatched(movie._id)}
                >
                  {movie.watched ? (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opa"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;
