import { Router } from "express";
import { getScrapedJobs } from "../controllers/scrapedJobs.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getScrapedJobs));

export default router;
