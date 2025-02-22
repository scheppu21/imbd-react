import { createContext, useContext, useState, useEffect } from "react";

// Define ThemeContext type
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Persist theme
  });

  // Apply theme to <html> when it changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme); // Save theme preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Single definition of useTheme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};














