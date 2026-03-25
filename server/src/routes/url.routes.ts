import { Router } from "express";
import {
  createShortUrl,
  getShortUrl,
  getShortUrlQrCode,
} from "../controllers/url.controller.js";
import { getAnalytics } from "../controllers/analytics.controller.js";
import {
  aggressiveLimiter,
  normalLimiter,
} from "../services/ratelimit.service.js";

const router = Router();

router.post("/shorten", aggressiveLimiter, createShortUrl);

router.get("/analytics/:shortId", normalLimiter, getAnalytics);

router.get("/qr/:shortId", normalLimiter, getShortUrlQrCode);

router.get("/:shortId", normalLimiter, getShortUrl);

export default router;
