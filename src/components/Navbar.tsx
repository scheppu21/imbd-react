import React, { useState, useEffect, useRef } from "react";
import { Film, Search, Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search after submission
    }
  };

  const navItems = [
    { label: "Movies", path: "/movies" },
    { label: "Top Rated", path: "/top-rated" },
    { label: "Coming Soon", path: "/coming-soon" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
<nav className={`border-b border-gray-800 sticky top-0 z-50 transition-colors duration-300 
  ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>



      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-glow">
            <Film className="w-8 h-8 text-yellow-500" />
            <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>MovieDB</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className={`bg-${theme === "dark" ? "zinc-900" : "zinc-100"} text-${theme === "dark" ? "white" : "black"} pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 w-64 transition-all`}
              />
            </form>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-${theme === "dark" ? "zinc-300" : "black"} hover:text-white transition-colors hover-glow`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className={`bg-${theme === "dark" ? "zinc-900" : "zinc-100"} text-${theme === "dark" ? "white" : "black"} pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 w-full`}
                />
              </form>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-${theme === "dark" ? "zinc-300" : "black"} hover:text-white transition-colors py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



