import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import { createUrlSchema, getUrlSchema } from "../schemas/index.js";
import {
  saveUrl,
  findUrlByShortId,
  incrementClicks,
} from "../repository/index.js";
import { error } from "node:console";

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = createUrlSchema.parse({ body: req.body });
    const { fullUrl } = validated.body;

    const shortId = nanoid(8);
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const shortUrl = `${baseUrl}/${shortId}`;

    const url = await saveUrl({
      fullUrl,
      shortId,
      shortUrl,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Short URL created",
      data: url,
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
    const validatedData = getUrlSchema.parse({ params: req.params });
    const { shortId } = validatedData.params;

    if (!shortId) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "short id not found",
        data: {},
        error: error,
      });
    }

    const url = await findUrlByShortId(shortId);

    if (!url) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "URL not found",
      });
    }

    await incrementClicks(shortId);

    return res.redirect(StatusCodes.MOVED_TEMPORARILY, url.fullUrl);
  } catch (error) {
    next(error);
  }
};
