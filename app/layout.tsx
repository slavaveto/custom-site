import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppContextProvider } from "@/context/app-context-provider";
import { ToasterProvider } from "@/app/components/providers/toaster-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <AppContextProvider>{children}</AppContextProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
