"use client";
import { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "@/context/app-context-provider";

export default function Page1() {
  const { pagesData } = useContext(AppContext);
  const page1Data = pagesData?.find((page) => page.object === "page-1");

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
      <h1 className="text-lg font-bold">{page1Data?.name}</h1>
      <div className="mt-2 text-sm text-gray-500">{page1Data?.pageContent}</div>
    </motion.div>
  );
}
