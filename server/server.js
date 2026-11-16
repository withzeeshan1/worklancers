import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import sanitize from "./middleware/sanitize.js";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { sitemap, robots } from "./controllers/miscController.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(sanitize);
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", routes);
app.get("/sitemap.xml", sitemap);
app.get("/robots.txt", robots);
app.use(notFound);
app.use(errorHandler);

export default app;

if (process.argv[1].endsWith("server.js")) {
  const port = process.env.PORT || 5000;
  connectDB().then(() => app.listen(port, () => console.log(`API running on :${port}`)))
    .catch((e) => { console.error(e.message); process.exit(1); });
}
