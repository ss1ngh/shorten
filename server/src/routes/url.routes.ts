import { Router } from "express";
import { createShortUrl, getShortUrl, getShortUrlQrCode } from "../controllers/url.controller.js";
import { getAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.post("/shorten", createShortUrl);
router.get("/analytics/:shortId", getAnalytics);
router.get("/qr/:shortId", getShortUrlQrCode);
router.get("/:shortId", getShortUrl);

export default router;
