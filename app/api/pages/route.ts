import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userLanguage = url.searchParams.get("lang");

  try {
    let pagesData = await db.page.findMany({
      where: {
        language: userLanguage ?? "en", // use the nullish coalescing operator to provide a default value if userLanguage is null
      },
    });
    //If language is not found, return default language = english
    if (pagesData.length === 0) {
      console.log(
        `Language [${userLanguage}] not found, returning Default language [en]`
      );
      pagesData = await db.page.findMany({
        where: {
          language: "en",
        },
      });
      return NextResponse.json(pagesData, { status: 200 });
    }

    return NextResponse.json(pagesData, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("GET PAGES ERROR", { status: 500 });
  }
}
