import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const siteInformation = await db.site.findFirst();
    return NextResponse.json(siteInformation);
  } catch (error) {
    console.log(error);
    return new NextResponse("GET SITES ERROR", { status: 500 });
  }
}
