"use client";

import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context/app-context-provider";
import { TabNav } from "../../components/tab-nav";

export default function Page2() {
  const { pagesData } = useContext(AppContext);
  const page2Data = pagesData?.find((page) => page.object === "page-2");
  const [selectedTab, setSelectedTab] = useState<string>(
    page2Data?.pageTabs?.[0]?.name || ""
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold mb-4">{page2Data?.name}</h1>

      <TabNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div>
        <div className="mt-4 text-sm text-gray-500">
          {
            page2Data?.pageTabs?.find((tab) => tab.name === selectedTab)
              ?.content
          }
        </div>
      </div>
    </div>
  );
}
