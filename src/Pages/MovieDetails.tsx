import { Award, Calendar, Clock, Heart, Play, Share2, Star } from "lucide-react";

import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const Movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      rating: 8.8,
      year: 2024,
      duration: "166 min",
      genre: ["Action", "Adventure", "Drama", "Sci-Fi"],
      director: "Denis Villeneuve",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
      image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=2000&q=80",
      backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2000&q=80",
      cast: [
        { id: 1, name: "Timothée Chalamet", role: "Paul Atreides", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", bio: "Rising star known for his compelling performances" },
        { id: 2, name: "Zendaya", role: "Chani", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", bio: "Multi-talented actress and fashion icon" },
      ],
      trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      awards: ["Academy Award Nominee", "Golden Globe Nominee"],
      boxOffice: "$494.7M",
      language: "English",
      productionCompany: "Legendary Entertainment",
      releaseDate: "2024-03-01",
      metacriticScore: 81,
      rottenTomatoesScore: 94,
    },
  ];

  const { id } = useParams();
  const movie = Movies.find((m) => m.id === Number(id)) || Movies[0];

  return (
    <div>
      <div className="relative h-[90vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdrop || movie.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="grid md:grid-cols-3 gap-8 items-end">
            <div className="hidden md:block">
              <img src={movie.image} alt={movie.title} className="rounded-lg shadow-xl aspect-[2/3] object-cover" />
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-yellow-500 font-semibold">{movie.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{movie.releaseDate}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <span key={g} className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </a>
                <button className="bg-gray-800/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Add to Watchlist
                </button>
                <button className="bg-gray-800/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Awards & Recognition</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {movie.awards.map((award, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    {award}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Movie Info</h3>
              <p className="text-gray-300"><strong>Director:</strong> {movie.director}</p>
              <p className="text-gray-300"><strong>Box Office:</strong> {movie.boxOffice}</p>
              <p className="text-gray-300"><strong>Language:</strong> {movie.language}</p>
              <p className="text-gray-300"><strong>Production:</strong> {movie.productionCompany}</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
