"use client";

import { createContext, useState, useEffect } from "react";
import { fetchPages } from "@/app/services/api-client/api-client";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { Site } from "@prisma/client";

import { fetchSiteInformation } from "@/app/services/api-client/api-client";

type PageTab = {
  object: string;
  name: string;
  content: string;
};

type Page = {
  id: string;
  object: string;
  language: string;
  name: string;
  pageContent: string[];
  pageTabs: PageTab[]; // Assuming pageTabs contains an array of PageTab objects
  createdAt: Date;
  updatedAt: Date;
};

type AppContextType = {
  pagesData: Page[] | null;
  siteData: Site | null;
  loading: boolean;
  error: string | null;
  language: string;
  setLanguage: (language: string) => void;
};

export const AppContext = createContext<AppContextType>({
  pagesData: null,
  siteData: null,
  loading: true,
  error: null,
  language: "en",
  setLanguage: () => {},
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Fallback language if detection fails
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"], // Order of detection sources
      caches: ["cookie"], // Cache the detected language in a cookie
    },
  });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pagesData, setPagesData] = useState<Page[] | null>(null);
  const [siteData, setSiteData] = useState<Site | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUserLanguage = () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const userLanguageAndCountry =
        navigator.language || navigator.languages[0] || "en-US";
      const userLanguage = userLanguageAndCountry.split("-")[0];
      return userLanguage;
    }
    return "en-US";
  };

  const [language, setLanguage] = useState<string>(getUserLanguage());

  const loadPages = async () => {
    try {
      const data = await fetchPages(language);
      setPagesData(data);
    } catch (err) {
      setError("Failed to fetch pages data.");
    } finally {
      setLoading(false);
    }
  };

  const loadSiteInformation = async () => {
    try {
      const response = await fetchSiteInformation(language);
      setSiteData(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`Language: ${language}`);
    loadPages();
    loadSiteInformation();
  }, [language]);

  return (
    <AppContext.Provider
      value={{ pagesData, siteData, loading, error, language, setLanguage }}
    >
      {children}
    </AppContext.Provider>
  );
};
