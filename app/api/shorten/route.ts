import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { fullUrl } = await request.json();

    if (!fullUrl) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    const shortId = nanoid(8);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shortUrl = `${baseUrl}/${shortId}`;

    const qrCode = await QRCode.toDataURL(shortUrl);

    const url = await prisma.url.create({
      data: {
        fullUrl,
        shortId,
        shortUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Short URL created",
        data: {
          url: {
            id: url.id,
            fullUrl: url.fullUrl,
            shortId: url.shortId,
            shortUrl: url.shortUrl,
            createdAt: url.createdAt.toISOString(),
          },
          qrCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create short URL" },
      { status: 500 }
    );
  }
}