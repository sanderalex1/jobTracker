import { scrapeJobs } from "../scrapers/finn.js";

export const runScraper = async (req, res) => {
  // don't await — run in background so response returns immediately
  scrapeJobs().catch((err) => console.error("Scraper error:", err));
  return res.status(202).json({ message: "Scraper started" });
};
