import type { Request, Response, NextFunction } from "express";
import { getUrlSchema } from "../schemas/url.schema.js";
import { getUrlAnalytics } from "../repository/index.js";
import { StatusCodes } from "http-status-codes";

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortId } = getUrlSchema.parse({ params: req.params }).params;

    const analytics = await getUrlAnalytics(shortId);

    if (!analytics) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Analytics Data  not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Analytics data found",
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};
