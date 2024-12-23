"use client";
import { useContext } from "react";
import Link from "next/link";

import { Twirl as Hamburger } from "hamburger-react";

import { AppContext } from "@/context/app-context-provider";

export const Header = () => {
  const { mobileNavOpen, setMobileNavOpen } = useContext(AppContext);
  const { siteData } = useContext(AppContext);

  return (
    <header className="h-[81px] w-full bg-gray-300 dark:bg-gray-900 flex items-center justify-center text-black dark:text-white">
      <div className="flex items-center w-full max-w-[800px] px-4">
        <div className="md:hidden">
          <Hamburger
            toggled={mobileNavOpen}
            toggle={() => setMobileNavOpen(!mobileNavOpen)}
            direction="left"
            duration={0.5}
          />
        </div>

        <div className="ml-auto">
          <Link href="/">
            <h1 className="md:text-2xl font-bold text-black dark:text-white">
              {siteData?.title}
            </h1>
          </Link>
          <Link href="/">
            <h2 className="italic text-gray-600 dark:text-gray-300">
              {siteData?.subtitle}
            </h2>
          </Link>
        </div>
      </div>
    </header>
  );
};
