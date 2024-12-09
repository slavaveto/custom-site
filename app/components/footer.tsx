import { useState, useEffect, useContext } from "react";
import { VscColorMode } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";

import { AppContext } from "@/context/app-context-provider";
import useDetectColorMode from "../hooks/detect-color";

export const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const { setLanguage } = useContext(AppContext);
  //let colorMode: string = "";
  const colorMode = useDetectColorMode();

  useEffect(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      if (storedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    } else {
      if (colorMode === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, [colorMode]);

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

  const handleLanguageChange = () => {
    console.log("handleLanguageChange");
    setLanguage("en-US");
  };

  return (
    <footer className="h-[54px] w-full bg-slate-100 dark:bg-gray-900 flex items-center justify-center text-black dark:text-white relative">
      <div className="flex flex-col w-full max-w-[800px] px-4">
        <div className="ml-auto flex gap-3">
          {/* Language Selector */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLanguageChange}
          >
            <div className="text-sm dark:text-gray-300">EN</div>
            <FaAngleDown className="text-sm dark:text-gray-400" />
          </div>

          {/* Dark Mode Toggle */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setIsThemeModalOpen((prev) => !prev)}
          >
            <VscColorMode className="text-xl rotate-45 dark:text-yellow-500" />
            <FaAngleDown className="text-sm dark:text-gray-400" />

           
          </div>


           {/* Theme selection box */}
           {isThemeModalOpen && (
              <div className="absolute -translate-y-[110%] -translate-x-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-lg mt-2 w-[150px]">
                <div
                  onClick={() => {
                    setIsDarkMode(false);
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                    setIsThemeModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Light Mode
                </div>
                <div
                  onClick={() => {
                    setIsDarkMode(true);
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                    setIsThemeModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Dark Mode
                </div>
                <div
                  onClick={() => {
                    localStorage.removeItem("theme");
                    document.documentElement.classList.remove("dark")
                    setIsThemeModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  System (auto)
                </div>
              </div>
            )}
        </div>
      </div>
    </footer>
  );
};
