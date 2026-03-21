import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";
import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import { error } from "node:console";

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullUrl } = req.body;

    const shortId = nanoid(8);
    const shortUrl = `${baseUrl}/${shortId}`;

    const url = await prisma.url.create({
      data: {
        fullUrl,
        shortId,
        shortUrl,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "short URL created",
      data: url,
      error: {},
    });
  } catch (error) {
    next(error);
  }
};

export const getShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortId } = req.params;

    if (typeof shortId !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid short ID format",
      });
    }
    const url = await prisma.url.findUnique({
      where: { shortId },
    });

    if (!url) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "url not found",
        data: {},
        error: error,
      });
    }
    await prisma.url.update({
      where: { shortId },
      data: {
        clicks: { increment: 1 },
      },
    });

    return res.redirect(StatusCodes.MOVED_TEMPORARILY, url.fullUrl);
  } catch (error) {
    next(error);
  }
};
