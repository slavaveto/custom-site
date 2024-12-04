"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PageNav } from "../components/page-nav";
import { TabNav } from "../components/tab-nav";

import { fetchPages } from "../services/api-client/api-client";

// Define types for the fetched data

type Page = {
  id: string;
  object: string;
  language: string;
  name: string;
  pageContent: string[];
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        const pagesData = await fetchPages();

        console.log(pagesData);
        setPages(pagesData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
        console.log(pages);
      }
    }

    loadData();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex content-center p-4 w-full">
        {/* Set max width to 800px, but allow it to shrink */}
        <div className="flex mx-auto w-full max-w-[800px]  mb-2">
          {/* LEFT */}
          <div className="w-1/4">
            <PageNav pages={pages} />
          </div>

          {/* RIGHT */}

          <div className="w-3/4">
            <section>
              {React.cloneElement(children as React.ReactElement, { pages })}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
