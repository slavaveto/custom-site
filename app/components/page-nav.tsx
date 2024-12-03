import { pageData } from "../mockData/pages";
import Link from "next/link";

export const PageNav = () => {
  let pageHref = "";

  return (
    <div className="flex flex-col">
      {pageData.map((page) => {
        if (page.id === 1) {
          pageHref = `/`;
        } else {
          pageHref = `/page-${page.id}`;
        }

        return (
          <Link key={page.id} href={pageHref}>
            {page.title}
          </Link>
        );
      })}
    </div>
  );
};
