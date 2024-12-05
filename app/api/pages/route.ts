import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET API PAGES");
  try {
    const pages = await db.page.findMany();
    console.log({ pages }); // Add this line to log the pages);
    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("GET PAGES ERROR", { status: 500 });
  }
}
