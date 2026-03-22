import { prisma } from "../config/index.js";

export const getUrlAnalytics = async (shortId: string) => {
  return await prisma.url.findUnique({
    where: { shortId },
    select: {
      clickLogs: {
        orderBy: { clickedAt: "desc" },
        take: 50, //return last 50 clicks
      },
    },
  });
};
