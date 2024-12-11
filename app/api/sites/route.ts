import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userLanguage = url.searchParams.get("lang");
  let siteInformation;

  try {
    let availableLanguages = await db.site.findMany({}).then((data) => {
      return data.map((site) => site.language);
    });

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
      return NextResponse.json(
        { siteInformation, availableLanguages },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { siteInformation, availableLanguages },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("GET SITES ERROR", { status: 500 });
  }
}
