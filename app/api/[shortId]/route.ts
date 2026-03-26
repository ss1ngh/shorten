import { NextResponse } from "next/server";
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

    const rawIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ip = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const userAgent = request.headers.get("user-agent") || "unknown";

    await prisma.$transaction(async (tx) => {
      await tx.url.update({
        where: { shortId },
        data: { clicks: { increment: 1 } },
      });

      await tx.clicks.create({
        data: {
          ip: ip || "unknown",
          userAgent: userAgent || "unknown",
          urlId: url.id,
        },
      });
    });

    return NextResponse.redirect(url.fullUrl, {
      status: 302,
    });
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}