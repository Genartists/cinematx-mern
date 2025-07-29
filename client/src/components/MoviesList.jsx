// import movieImg from "../assets/s-1400.jpg"
import heroImage from "../assets/movie.jpg";

// render movies was fetched
function MovieList({ movies, onDelete, onEdit }) {
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
            {/* <img src={heroImage} alt="" className=" h-auto w-auto" /> */}

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
                  className="bg-[#9CE53E] text-[#245313] px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div className="text-yellow-500 font-bold">⭐ {movie.rating}</div>
              {/* {item.watched && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Watched
                </span>
              )} */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;
