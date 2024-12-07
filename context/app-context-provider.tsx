"use client";

import { createContext, useState, useEffect } from "react";
import { fetchPages } from "@/app/services/api-client/api-client";

type PageTab = {
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
  loading: boolean;
  error: string | null;
};

export const AppContext = createContext<AppContextType>({
  pagesData: null,
  loading: true,
  error: null,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pagesData, setPagesData] = useState<Page[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPages() {
      try {
        const data = await fetchPages();
        setPagesData(data);
      } catch (err) {
        setError("Failed to fetch pages data.");
      } finally {
        setLoading(false);
      }
    }

    loadPages();
  }, []);

  return (
    <AppContext.Provider value={{ pagesData, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};
