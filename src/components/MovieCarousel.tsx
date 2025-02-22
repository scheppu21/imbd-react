import React from "react";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string[];
};

type MovieCarouselProps = {
  movies: Movie[];
};

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="min-w-[200px] md:min-w-[250px] bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-gray-400 text-sm">{movie.year}</p>
              <p className="text-yellow-400 text-sm">⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;

