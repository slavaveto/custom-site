"use client";
import { useState, useEffect } from "react";
import { fetchSiteInformation } from "../services/api-client/api-client";

type SiteInformation = {
  title: string;
  subtitle: string;
  language: string;
};

export const Header = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    <header className="h-[81px] w-full bg-gray-200 flex items-center justify-center text-black">
      <div className="flex flex-col w-full max-w-[800px]">
        <div className="ml-auto">
          <h1 className="text-2xl font-bold">{siteInfo?.title}</h1>
          <h2 className="italic">{siteInfo?.subtitle}</h2>
        </div>
      </div>
    </header>
  );
};
