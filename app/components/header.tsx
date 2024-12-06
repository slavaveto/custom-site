"use client";
import { useState, useEffect } from "react";
import { fetchSiteInformation } from "../services/api-client/api-client";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";

import { PageNav } from "./page-nav";

type SiteInformation = {
  title: string;
  subtitle: string;
  language: string;
};

export const Header = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  // Fetch data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        const siteData = await fetchSiteInformation();
        setSiteInfo(siteData);
        console.log(siteData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        console.log(siteInfo);
      }
    }

    loadData();
  }, []);

  return (
    <header className="h-[81px] w-full bg-gray-300 flex items-center justify-center text-black">
      <div className="flex items-center w-full max-w-[800px] px-4">
        <RxHamburgerMenu
          className="cursor-pointer text-2xl md:hidden block"
          onClick={() => setMobileNavOpen(true)}
        />
        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 left-0 h-full w-2/3 z-50 transform transition-transform duration-300 backdrop-blur-md bg-white/30 border border-white/20 shadow-lg ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4">
            <button
              className="text-black font-bold mb-4 ml-auto"
              onClick={() => setMobileNavOpen(false)}
            >
              <IoCloseCircleOutline className="text-4xl" />
            </button>
            <PageNav mobile setMobileNavOpen={setMobileNavOpen} />
          </div>
        </div>

        <div className="ml-auto">
          <h1 className="text-2xl font-bold">{siteInfo?.title}</h1>
          <h2 className="italic">{siteInfo?.subtitle}</h2>
        </div>
      </div>
    </header>
  );
};
