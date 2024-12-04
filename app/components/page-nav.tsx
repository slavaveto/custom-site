"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/context/app-context-provider";

import { Page } from "@prisma/client";

export const PageNav = () => {
  const { pagesData } = useContext(AppContext);
  const [selectedPage, setSelectedPage] = useState<string>("");
  let pageHref = "";

  return (
    <div className="flex flex-col">
      {pagesData?.map((page: Page) => {
        if (page.object === "page-1") {
          pageHref = `/`;
        } else {
          pageHref = `/${page.object}`;
        }

        return (
          <Link
            key={page.id}
            href={pageHref}
            onClick={() => setSelectedPage(page.object)}
            className={selectedPage === page.object ? "font-bold" : ""}
          >
            {page.name}
          </Link>
        );
      })}
    </div>
  );
};
