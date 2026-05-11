import { Router } from "express";
import { runScraper } from "../controllers/scraper.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();
router.post("/run", asyncHandler(runScraper));
export default router;
