import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userLanguage = url.searchParams.get("lang");
  let siteInformation;

  try {
    siteInformation = await db.site.findFirst({
      where: {
        language: userLanguage ?? "en",
      },
    });

    //If language is not found, return default language = english
    if (!siteInformation) {
      console.log(
        `Language [${userLanguage}] not found, returning Default language [en]`
      );
      siteInformation = await db.site.findFirst({
        where: {
          language: "en",
        },
      });
      return NextResponse.json(siteInformation, { status: 200 });
    }

    return NextResponse.json(siteInformation, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("GET SITES ERROR", { status: 500 });
  }
}
