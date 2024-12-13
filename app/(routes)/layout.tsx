"use client";
import { useEffect, useState, useContext } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PageNav } from "../components/page-nav";

import { MobileNav } from "../components/mobile-nav";
import { AppContext } from "@/context/app-context-provider";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mobileNavOpen, setMobileNavOpen } = useContext(AppContext);
  const [delayedFilter, setDelayedFilter] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mobileNavOpen) {
      timer = setTimeout(() => setDelayedFilter(true), 350);
    } else {
      setDelayedFilter(false); // Reset immediately when closed
    }
    return () => clearTimeout(timer); // Clean up timeout
  }, [mobileNavOpen]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNav />

      <div
        className={`relative flex flex-col min-h-screen transform transition-transform duration-300 ${
          mobileNavOpen ? "translate-x-[80%]" : "translate-x-0"
        } ${
          delayedFilter
            ? "filter brightness-75 transition-all duration-300"
            : "filter brightness-100 transition-all duration-300"
        }`}
      >
        <Header />

        {/* Main Content */}
        <main className="flex-grow flex content-center p-4 w-full bg-white dark:bg-gray-800">
          {/* Set max width to 800px, but allow it to shrink */}
          <div className="flex mx-auto w-full max-w-[800px]  mb-2">
            {/* LEFT -large screens only */}
            <div className="w-1/4 hidden md:block">
              <PageNav />
            </div>
            {/* RIGHT */}
            <div className="w-full md:w-3/4">
              <section>{children}</section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
