import "dotenv/config";
import cron from "node-cron";
import { scrapeJobs } from "./scrapers/finn.js";
import pool from "./db/pool.js";

// run every 4 hours
cron.schedule("0 */4 * * *", async () => {
  console.log("Starting scheduled scrape:", new Date().toISOString());
  try {
    await scrapeJobs();
    console.log("Scrape completed successfully");
  } catch (e) {
    console.error("Scrape failed:", e.message);
  }
});

// cleanup old jobs — runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running cleanup job:", new Date().toISOString());
  try {
    const result = await pool.query(
      `DELETE FROM scraped_jobs 
       WHERE scraped_at < NOW() - INTERVAL '30 days'
       AND is_applied = false
       RETURNING id`,
    );
    console.log(`Deleted ${result.rows.length} old jobs`);
  } catch (e) {
    console.error("Cleanup failed:", e.message);
  }
});

console.log("Scheduler started — scraping every 4 hours");
