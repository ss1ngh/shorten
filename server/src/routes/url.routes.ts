import express from "express";
import {
  createShortUrl,
  getAnalytics,
  getShortUrl,
} from "../controllers/index.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/analytics/:shortId", getAnalytics);
router.get("/:shortId", getShortUrl);

export default router;
