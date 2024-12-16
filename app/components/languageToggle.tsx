import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/app-context-provider";

import { FaAngleDown } from "react-icons/fa6";

export const LanguageToggle = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { setLanguage, language, allAvailableLanguages } =
    useContext(AppContext);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsLanguageModalOpen(true)}
      >
        <div className="text-sm dark:text-gray-300">
          {language.toUpperCase()}
        </div>
        <FaAngleDown className="text-sm dark:text-gray-400" />
      </div>

      {/* Language selection box */}
      {isLanguageModalOpen && (
        <>
          <div className="absolute z-50 -translate-y-[110%] -translate-x-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-lg mt-2 w-[150px]">
            {allAvailableLanguages.map((language) => (
              <div
                key={language}
                onClick={() => {
                  handleLanguageChange(language);
                  setIsLanguageModalOpen(false);
                }}
                className="cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {language.toUpperCase()}
              </div>
            ))}
          </div>
          {/* Screen blocker */}
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-10"
            onClick={() => setIsLanguageModalOpen(false)}
          />
        </>
      )}
    </>
  );
};
