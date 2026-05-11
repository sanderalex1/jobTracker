import "dotenv/config";
import express from "express";
import applicationsRouter from "./routes/applications.js";
import scrapedJobsRouter from "./routes/scrapedJobs.js";
import scraperRouter from "./routes/scraper.js";
import cors from "cors";

const app = express(); // creates the app

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/api/v1/applications", applicationsRouter);
app.use("/api/v1/scraped-jobs", scrapedJobsRouter);
app.use("/api/v1/scraper", scraperRouter);

app.use((err, req, res, next) => {
  if (err) {
    switch (err.code) {
      case "ECONNREFUSED":
        console.log(err);
        return res.status(500).json({ error: "DB error!" });
      default:
        console.log(err);
        return res.status(500).json({ error: "Internal server error!" });
    }
  }
});

export default app;
