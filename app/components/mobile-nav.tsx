import { useContext } from "react";
import { AppContext } from "@/context/app-context-provider";

import { PageNav } from "./page-nav";

export const MobileNav = () => {
  const { mobileNavOpen, setMobileNavOpen } = useContext(AppContext);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[80%] bg-white/30 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 shadow-lg 
      }`}
    >
      <div className="flex flex-col px-4 pt-10">
        <PageNav mobile setMobileNavOpen={setMobileNavOpen} />
      </div>
    </div>
  );
};
