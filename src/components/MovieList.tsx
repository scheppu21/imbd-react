import React, { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import MovieListItem from "../components/MovieListItem";

type Movie = {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string[];
};

const MovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const [view, setView] = useState("grid");

  useEffect(() => {
    const savedView = localStorage.getItem("movieView");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  const toggleView = (newView: string) => {
    setView(newView);
    localStorage.setItem("movieView", newView);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <div className="flex gap-4">
          <button
            onClick={() => toggleView("grid")}
            className={`p-2 rounded-lg ${view === "grid" ? "bg-yellow-500" : "bg-gray-700"}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleView("list")}
            className={`p-2 rounded-lg ${view === "list" ? "bg-yellow-500" : "bg-gray-700"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ✅ Show "No Movies Found" if movies array is empty */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No movies found. Try searching for a different title.
        </p>
      ) : (
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}
        >
          {movies.map((movie) =>
            view === "grid" ? (
              <MovieCard key={movie.id} movie={movie} />
            ) : (
              <MovieListItem key={movie.id} movie={movie} />
            )
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MovieList;



