import { useState, useEffect, useContext } from "react";
import { FaAngleDown } from "react-icons/fa6";

import { ThemeModal } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";

export const Footer = () => {
  //let colorMode: string = "";

  return (
    <footer className="h-[54px] w-full bg-slate-100 dark:bg-gray-900 flex items-center justify-center text-black dark:text-white relative">
      <div className="flex flex-col w-full max-w-[800px] px-4">
        <div className="ml-auto flex gap-3">
          {/* Language Selector */}
          <LanguageToggle />

          <ThemeModal />
        </div>
      </div>
    </footer>
  );
};
