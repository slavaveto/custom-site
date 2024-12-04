"use client";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PageNav } from "../components/page-nav";
import { TabNav } from "../components/tab-nav";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex content-center p-4 w-full">
        {/* Set max width to 800px, but allow it to shrink */}
        <div className="flex mx-auto w-full max-w-[800px]  mb-2">
          {/* LEFT */}
          <div className="w-1/4">
            <PageNav />
          </div>

          {/* RIGHT */}

          <div className="w-3/4">
            <section>{children}</section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
