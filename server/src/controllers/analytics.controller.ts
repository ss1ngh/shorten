import type { Request, Response, NextFunction } from "express";
import { getUrlSchema } from "../schemas/url.schema.js";
import { getUrlAnalytics, getUrlAnalyticsByDate } from "../repository/index.js";
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

    const analyticsByDate = await getUrlAnalyticsByDate(analytics.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Analytics data found",
      data: {
        rawLogs: analytics.clickLogs,
        chartData: analyticsByDate,
      },
    });
  } catch (error) {
    next(error);
  }
};
