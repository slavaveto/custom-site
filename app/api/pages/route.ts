import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET API PAGES");
  try {
    const pagesData = await db.page.findMany();
    return NextResponse.json(pagesData, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("GET PAGES ERROR", { status: 500 });
  }
}
