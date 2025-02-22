import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import MovieList from "./Pages/MovieList.tsx";
import MovieDetails from "./Pages/MovieDetails.tsx";
import Toprated from "./Pages/Toprated.jsx";
import Actordetails from "./Pages/Actordetails.tsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import useTheme

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme(); // Get theme from context

  return (
    <BrowserRouter>
      <div className={theme === "dark" ? "dark" : ""}> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/actor/:id" element={<Actordetails />} />
          <Route path="/top-rated" element={<Toprated />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

