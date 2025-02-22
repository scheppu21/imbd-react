import React from "react";

type Movie = {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string[];
};

const MovieListItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700">
      <img src={movie.image} alt={movie.title} className="w-20 h-20 object-cover rounded" />
      <div>
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-gray-400">⭐ {movie.rating} | {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieListItem;



