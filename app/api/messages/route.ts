import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const receivedMessage = await request.json();

  try {
    const newMessage = await db.message.create({
      data: {
        name: receivedMessage.name,
        email: receivedMessage.email,
        telegram: receivedMessage.telegram,
        message: receivedMessage.message,
      },
    });

    return NextResponse.json(newMessage, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("POST MESSAGE ERROR", { status: 500 });
  }
}
