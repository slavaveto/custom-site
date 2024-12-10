"use client";

import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context/app-context-provider";
import { TabNav } from "../../components/tab-nav";

//import { MessageForm } from "../page-3/_components/message-form";
import { MessageForm } from "@/app/components/mui-message-form";
import { motion } from "framer-motion";
 

export default function Page2() {
  const { pagesData } = useContext(AppContext);
  const page2Data = pagesData?.find((page) => page.object === "page-2");
  const [selectedTab, setSelectedTab] = useState<string>(
    page2Data?.pageTabs?.[0]?.object || ""
  );

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", 
      },
    },
    exit: {
      opacity: 0,
      y: -50, 
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
    className="flex flex-col"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
      <h1 className="text-lg font-bold mb-4">{page2Data?.name}</h1>

      <TabNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div>
        <div className="mt-4 text-sm text-gray-500">
          {
            page2Data?.pageTabs?.find((tab) => tab.object === selectedTab)
              ?.content
          }
        </div>
        {selectedTab === "tab-2" && (
          <div className="max-w-[366px]">
            <MessageForm page="page-2" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
