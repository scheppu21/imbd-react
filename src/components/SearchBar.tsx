import React, { useState, useEffect, useRef } from "react";

const API_KEY = "c05e84df"; // Your OMDb API Key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch Movies from API
  const fetchResults = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();

      if (data.Search) {
        setResults(data.Search as Movie[]);
        setSelectedIndex(-1); // Reset selection when new results load
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!resultsRef.current) return;
      const items = resultsRef.current.querySelectorAll<HTMLDivElement>(".search-item");

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Enter" && selectedIndex >= 0 && items.length > 0) {
        items[selectedIndex].click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [results, selectedIndex]);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setResults([]); // Close results when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchResults(e.target.value);
        }}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {results.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden max-h-60 overflow-y-auto"
          ref={resultsRef}
        >
          {results.map((movie, index) => (
            <div
              key={movie.imdbID}
              role="button"
              tabIndex={0}
              className={`search-item flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedIndex ? "bg-gray-200" : ""
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <img src={movie.Poster} alt={movie.Title} width="50" className="rounded-md" />
              <span>{movie.Title} ({movie.Year})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


