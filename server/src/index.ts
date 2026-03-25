  import express from "express";
  import cors from "cors";
  import urlRoutes from "./routes/url.routes.js";
  import { errorHandler } from "./middleware/error.middleware.js";
  import { redisClientConnect } from "./config/index.js";

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.json());
  app.use(cors());

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/", urlRoutes);

  app.use(errorHandler);

  const startServer = async () => {
    try {
      await redisClientConnect();
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error("Failed to connect to infrastructure:", err);
      process.exit(1);
    }
  };

  startServer();
