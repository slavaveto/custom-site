import { useState, useEffect } from "react";
import { VscColorMode } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";

export const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <footer className="h-[54px] w-full bg-slate-100 dark:bg-gray-900 flex items-center justify-center text-black dark:text-white">
      <div className="flex flex-col w-full max-w-[800px] px-4">
        <div className="ml-auto flex gap-3">
          {/* Language Selector */}
          <div className="flex items-center cursor-pointer">
            <div className="text-sm dark:text-gray-300">EN</div>
            <FaAngleDown className="text-sm dark:text-gray-400" />
          </div>

          {/* Dark Mode Toggle */}
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDarkMode}
          >
            <VscColorMode className="text-xl rotate-45 dark:text-yellow-500" />
            <FaAngleDown className="text-sm dark:text-gray-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
