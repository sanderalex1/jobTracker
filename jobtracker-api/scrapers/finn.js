import "dotenv/config";
import { chromium } from "playwright";
import pool from "../db/pool.js";

const scrapeJobDetails = async (page, link) => {
  try {
    await page.goto(link);
    await page.waitForSelector("div.import-decoration");
    const description = await page.$eval("div.import-decoration", (el) =>
      el.textContent.trim(),
    );
    return description;
  } catch {
    return null; // description not available
  }
};

// extracts jobs from one search results page
const scrapeKeyword = async (page, keyword) => {
  await page.goto(
    `https://www.finn.no/job/search?location=0.20001&q=${keyword}`,
  );
  await page.waitForSelector('article[id^="card-"]');
  const cards = await page.$$('article[id^="card-"]');

  // FIRST PASS — extract all card data before navigating away
  const cardData = [];
  for (const card of cards) {
    try {
      const title = await card.$eval(".job-card-link", (el) =>
        el.textContent.trim(),
      );
      const link = await card.$eval(".job-card-link", (el) => el.href);
      const company = await card.$eval(".text-caption strong", (el) =>
        el.textContent.trim(),
      );
      const location = await card.$eval(
        "ul.job-card__pills li:first-child span",
        (el) => el.textContent.trim(),
      );

      let salary = null;
      try {
        salary = await card.$eval(".salary", (el) => el.textContent.trim());
      } catch {}

      let postedDate = null;
      try {
        postedDate = await card.$eval("time", (el) =>
          el.getAttribute("datetime"),
        );
      } catch {}

      cardData.push({ title, link, company, location, salary, postedDate });
    } catch {
      // skip cards that fail
    }
  }

  // SECOND PASS — visit job pages for new jobs only
  const jobs = [];
  for (const job of cardData) {
    const existing = await pool.query(
      "SELECT id FROM scraped_jobs WHERE link = $1",
      [job.link],
    );
    if (existing.rows.length > 0) continue;

    const description = await scrapeJobDetails(page, job.link);
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await page.waitForTimeout(delay);

    jobs.push({ ...job, description });
  }

  return jobs;
};

const saveJob = async (job) => {
  await pool.query(
    `INSERT INTO scraped_jobs (id, title, company, location, salary, description, link, source, posted_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (link) DO NOTHING`,
    [
      crypto.randomUUID(),
      job.title,
      job.company,
      job.location,
      job.salary,
      job.description,
      job.link,
      "finn",
      job.postedDate,
    ],
  );
};

// main function — reads keywords from DB and scrapes each one
export const scrapeJobs = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // read keywords from DB
    const { rows } = await pool.query(
      `SELECT value FROM search_config WHERE source = 'finn' AND type = 'keyword'`,
    );

    for (const row of rows) {
      console.log(`Scraping keyword: ${row.value}`);
      const jobs = await scrapeKeyword(page, row.value);
      for (const job of jobs) {
        await saveJob(job);
      }

      console.log(`Saved ${jobs.length} new jobs for "${row.value}"`);
    }
  } finally {
    // always close the browser — even if something throws
    await browser.close();
  }
};
