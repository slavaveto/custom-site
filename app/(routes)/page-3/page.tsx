"use client";
import { useContext } from "react";
import { AppContext } from "@/context/app-context-provider";
import { motion } from "framer-motion";

//import { MessageForm } from "./_components/message-form";
import { MessageForm } from "@/app/components/mui-message-form";

export default function Page3() {
  const { pagesData } = useContext(AppContext);
  const page3Data = pagesData?.find((page) => page.object === "page-3");

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

  // Form state

  return (
    <motion.div
    className="flex flex-col"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
      <h1 className="text-lg font-bold">{page3Data?.name}</h1>
      <div className="mt-2 text-sm text-gray-500">{page3Data?.pageContent}</div>
      <div className="max-w-[366px]">
        {/* <MessageForm /> */}
        <MessageForm page="page-3" />
      </div>
    </motion.div>
  );
}
