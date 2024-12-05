"use client";
import { useContext } from "react";
import { AppContext } from "@/context/app-context-provider";

import { MessageForm } from "./_components/message-form";

export default function Page3() {
  const { pagesData } = useContext(AppContext);
  const page3Data = pagesData?.find((page) => page.object === "page-3");

  // Form state

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold">{page3Data?.name}</h1>
      <div className="mt-2 text-sm text-gray-500">{page3Data?.pageContent}</div>
      <div className="max-w-[366px]">
        <MessageForm />
      </div>
    </div>
  );
}
