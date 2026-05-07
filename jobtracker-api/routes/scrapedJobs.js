import { Router } from "express";
import { getScrapedJobs, markAsApplied } from "../controllers/scrapedJobs.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getScrapedJobs));
router.patch("/:id", asyncHandler(markAsApplied));

export default router;
