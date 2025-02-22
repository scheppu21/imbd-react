import React from "react"; // ✅ Fix import
import Hero from "../components/Hero";
import { Award, Clock, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import MovieCarousel from "../components/MovieCarousel";



// Movie Type
type Movie = {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string[];
};

// Trending Movies Data
const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    rating: 8.8,
    image:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=800&q=80",
    year: 2024,
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "Poor Things",
    rating: 8.4,
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    year: 2023,
    genre: ["Comedy", "Drama", "Romance"],
  },
  {
    id: 3,
    title: "Oppenheimer",
    rating: 8.9,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    year: 2023,
    genre: ["Biography", "Drama", "History"],
  },
];

// Upcoming Movies Data
const upcomingMovies: Movie[] = [
  {
    id: 6,
    title: "Deadpool 3",
    rating: 9.1,
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80",
    year: 2024,
    genre: ["Action", "Comedy", "Adventure"],
  },
  {
    id: 8,
    title: "Kingdom of the Planet of the Apes",
    rating: 8.3,
    image:
      "https://images.unsplash.com/photo-1533973860717-d49dfd14cf64?auto=format&fit=crop&w=800&q=80",
    year: 2024,
    genre: ["Action", "Adventure", "Drama"],
  },
];

// Movie Categories
const categories = [
  { icon: TrendingUp, label: "Trending", path: "/movies?sort=trending", color: "bg-yellow-500" },
  { icon: Star, label: "Top Rated", path: "/top-rated", color: "bg-purple-500" },
  { icon: Clock, label: "Coming Soon", path: "/coming-soon", color: "bg-blue-500" },
  { icon: Award, label: "Awards", path: "/awards", color: "bg-red-500" },
];

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map(({ icon: Icon, label, path, color }, index) => (
            <Link
              key={index}
              to={path}
              className={`${color} p-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-70 transition-opacity`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>

        {/* Trending Movies */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-500" />
              Trending Now
            </h2>
            <Link to="/movies?sort=trending" className="text-yellow-500 hover:text-yellow-400">
              View All
            </Link>
          </div>
          <MovieCarousel movies={trendingMovies} />
        </section>

        {/* Coming Soon Movies */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              Coming Soon
            </h2>
            <Link to="/coming-soon" className="text-yellow-500 hover:text-yellow-400">
              View All
            </Link>
          </div>
          <MovieCarousel movies={upcomingMovies} />
        </section>
      </main>
    </div>
  );
};

export default Home;
