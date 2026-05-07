import * as scrapedJobsServices from "../services/scrapedJobs.js";

export const getScrapedJobs = async (req, res) => {
  return res.json(await scrapedJobsServices.fetchJobs(req.query));
};
