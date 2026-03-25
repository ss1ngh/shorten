import { prisma } from "../config/index.js";

export const getUrlAnalytics = async (shortId: string) => {
  return await prisma.url.findUnique({
    where: { shortId },
    select: {
      id: true,
      clicks : true,
      clickLogs: {
        orderBy: { clickedAt: "desc" },
        take: 50, //return last 50 clicks
      },
    },
  });
};

export const getUrlAnalyticsByDate = async (urlId: string) => {
  return await prisma.clicks.groupBy({
    by: ["clickedAt"],
    where: { urlId },
    _count: { id: true },
  });
};
