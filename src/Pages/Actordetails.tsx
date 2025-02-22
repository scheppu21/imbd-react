import { useParams, Link } from "react-router-dom";

import { actors, type Actor, type Movie } from "../data"; // ✅ Fix import

import { motion } from "framer-motion";
import React from "react";

const Actordetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const actor: Actor | undefined = actors.find((m: Actor) => m.id === Number(id));

  if (!actor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-center text-red-500 text-2xl font-bold">
          Actor not found!
        </h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen p-10 bg-gray-900 text-white"
      style={{
        backgroundImage: actor.coverImage ? `url(${actor.coverImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-10 p-10 rounded-xl">
        {/* Actor Image */}
        {actor.image && (
          <img
            src={actor.image}
            alt={`Portrait of ${actor.name}`}
            className="w-48 h-48 md:w-64 md:h-64 rounded-xl object-cover border-4 border-gray-900"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Actor Details */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
            {actor.name}
          </h1>
          <p className="mt-2 text-gray-300">{actor.bio || "No biography available."}</p>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Born:</span> {actor.birthDate || "N/A"}
          </p>
        </div>
      </div>

      {/* Known For Section */}
      <section className="relative mt-10">
        <h2 className="text-2xl font-bold text-yellow-400 border-b-2 border-yellow-500 inline-block pb-2">
          Known For
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {actor.knownFor?.length ? (
            actor.knownFor.map((movie: Movie, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <img
                  src={movie.image}
                  alt={`Poster of ${movie.title}`}
                  className="w-full h-40 object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
                <p className="mt-2 text-center font-semibold">{movie.title}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No movies available.</p>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section className="relative mt-10">
        <h2 className="text-2xl font-bold text-yellow-400 border-b-2 border-yellow-500 inline-block pb-2">
          Awards
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {actor.awards?.length ? (
            actor.awards.map((award: { title: string; year: number }, index: number) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl shadow-md"
              >
                🏆 <p className="text-gray-300">{award.title ? `${award.title} (${award.year})` : "Award Received"}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No awards listed.</p>
          )}
        </div>
      </section>

      {/* Back Button */}
      <div className="relative mt-10 text-center">
        <Link
          to="/actors"
          className="bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-all"
        >
          Back to Actors
        </Link>
      </div>
    </motion.div>
  );
};

export default Actordetails;




