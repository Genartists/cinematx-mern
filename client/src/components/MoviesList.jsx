import React from "react";
// render movies was fetched
function MovieList({ movies }) {
  return (
    <div className="grid text-[#153a43] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {movies.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No movies found!
        </p>
      ) : (
        movies.map((movie) => (
          <div
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl transition"
            key={movie._id}
          >
            <h3 className="text-xl font-semibold">
              {movie.name}{" "}
              <span className="text-base font-normal">
                ({movie.year})
              </span>
            </h3>
            <p className="text-gray-700">{movie.description}</p>
            <div className="flex flex-wrap gap-2 my-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-yellow-200 text-[#153a43] px-2 py-0.5 rounded text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-auto text-yellow-500 font-bold">
              ⭐ {movie.rating}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;
