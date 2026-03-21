import express from "express";

const router = express.Router();

router.post("/shortener", createShortUrl);
router.get("/shortener", getShortUrl);

export default router;
