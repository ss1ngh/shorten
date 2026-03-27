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

export const incrementClicks = async (
  shortId: string,
  metadata: { ip: string; userAgent: string },
) => {
  return await prisma.$transaction(async (tx) => {
    const url = await tx.url.update({
      where: { shortId },
      data: { clicks: { increment: 1 } },
    });

    await tx.clicks.create({
      data: {
        ip: metadata.ip,
        userAgent: metadata.userAgent,
        urlId: url.id,
      },
    });

    return url;
  });
};