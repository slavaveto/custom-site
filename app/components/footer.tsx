import { useState, useEffect, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";

import { AppContext } from "@/context/app-context-provider";

import { ThemeModal } from "./themeToggle";

export const Footer = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { setLanguage, setIsDarkMode } = useContext(AppContext);
  //let colorMode: string = "";

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

          {/* Language selection box */}
          {isLanguageModalOpen && (
            <>
              <div className="absolute z-50 -translate-y-[110%] -translate-x-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-lg mt-2 w-[150px]">
                <div
                  onClick={() => {
                    setIsLanguageModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Light Mode
                </div>
                <div
                  onClick={() => {
                    setIsLanguageModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Dark Mode
                </div>
                <div
                  onClick={() => {
                    setIsLanguageModalOpen(false);
                  }}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  System (auto)
                </div>
              </div>
              {/* Screen blocker */}
              <div
                className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-10"
                onClick={() => setIsLanguageModalOpen(false)}
              />
            </>
          )}

          {/* Dark Mode Toggle */}
          <ThemeModal />
        </div>
      </div>
    </footer>
  );
};
