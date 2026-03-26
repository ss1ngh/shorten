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
      include: {
        clickLogs: true,
      },
    });

    if (!url) {
      return NextResponse.json(
        { success: false, message: "Analytics not found" },
        { status: 404 }
      );
    }

    const clicksByDate = await prisma.clicks.groupBy({
      by: ["clickedAt"],
      where: { urlId: url.id },
      _count: true,
    });

    const chartData = clicksByDate.map((item) => ({
      date: item.clickedAt.toISOString().split("T")[0],
      _count: item._count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        rawLogs: url.clickLogs,
        chartData,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}