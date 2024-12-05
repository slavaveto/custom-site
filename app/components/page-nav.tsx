"use client";
import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppContext } from "@/context/app-context-provider";

import { Page } from "@prisma/client";

export const PageNav = () => {
  const pathname = usePathname();
  const { pagesData } = useContext(AppContext);
  const [selectedPage, setSelectedPage] = useState<string>(
    pathname.split("/")[1] || "page-1"
  );
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
