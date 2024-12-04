import { pageData } from "../mockData/pages";
import Link from "next/link";

type Page = {
  id: string;
  object: string;
  language: string;
  name: string;
  pageContent: string[];
};

export const PageNav = ({ pages }: { pages: Page[] }) => {
  let pageHref = "";

  return (
    <div className="flex flex-col">
      {pages.map((page: Page) => {
        if (page.object === "page-1") {
          pageHref = `/`;
        } else {
          pageHref = `/${page.object}`;
        }

        return (
          <Link key={page.id} href={pageHref}>
            {page.name}
          </Link>
        );
      })}
    </div>
  );
};
