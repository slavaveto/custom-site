"use client";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PageNav } from "../components/page-nav";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex content-center p-4 w-full">
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
  );
}
