import { prisma } from "../config/index.js";

export const saveUrl = async (data: {
  fullUrl: string;
  shortId: string;
  shortUrl: string;
}) => {
  return await prisma.url.create({ data });
};

export const findUrlByShortId = async (shortId: string) => {
  return await prisma.url.findUnique({
    where: { shortId },
  });
};

export const incrementClicks = async (shortId: string) => {
  return await prisma.url.update({
    where: { shortId },
    data: { clicks: { increment: 1 } },
  });
};
