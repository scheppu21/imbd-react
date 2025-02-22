import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;



