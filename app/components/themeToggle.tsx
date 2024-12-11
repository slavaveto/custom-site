import { useState, useContext, useEffect } from "react";

import { AppContext } from "@/context/app-context-provider";
import useDetectColorMode from "../hooks/detect-color";

import { VscColorMode } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";

export const ThemeModal = () => {
  const { setIsDarkMode } = useContext(AppContext);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

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

  return (
    <>
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => setIsThemeModalOpen((prev) => !prev)}
      >
        <VscColorMode className="text-xl rotate-45 dark:text-yellow-500" />
        <FaAngleDown className="text-sm dark:text-gray-400" />
      </div>

      {/* Theme selection box */}
      {isThemeModalOpen && (
        <>
          <div className="absolute z-50 -translate-y-[110%] -translate-x-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-lg mt-2 w-[150px]">
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
                document.documentElement.classList.remove("dark");
                setIsThemeModalOpen(false);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              System (auto)
            </div>
          </div>
          {/* Screen blocker */}
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-10"
            onClick={() => setIsThemeModalOpen(false)}
          />
        </>
      )}
    </>
  );
};
