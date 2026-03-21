import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";
import { createShortUrl, getShortUrl } from "./repository/url.controllers.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", createSbortUrl);
