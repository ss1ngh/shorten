import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  try {
    const { shortId } = await params;

    const url = await prisma.url.findUnique({
      where: { shortId },
    });

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL not found" },
        { status: 404 }
      );
    }

    const qrCode = await QRCode.toDataURL(url.shortUrl);

    return NextResponse.json({
      success: true,
      qrCode,
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}