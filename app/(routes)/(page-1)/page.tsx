"use client";
import { useContext } from "react";
import { AppContext } from "@/context/app-context-provider";

export default function Page1() {
  const { pagesData } = useContext(AppContext);
  const page1Data = pagesData?.find((page) => page.object === "page-1");

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold">{page1Data?.name}</h1>
      <div className="mt-2 text-sm text-gray-500">{page1Data?.pageContent}</div>
    </div>
  );
}
