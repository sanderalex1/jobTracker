import * as scrapedJobsServices from "../services/scrapedJobs.js";

export const getScrapedJobs = async (req, res) => {
  return res.json(await scrapedJobsServices.fetchJobs(req.query));
};

export const markAsApplied = async (req, res) => {
  const { id } = req.params;

  const result = await scrapedJobsServices.markAsApplied(id);

  if (result === null) {
    return res.status(404).json({ error: "Job not found" });
  }
  return res.status(200).json(result);
};
