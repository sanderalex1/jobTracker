import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
  getApplicationById,
  getStats,
} from "../controllers/applications.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = Router();

router.get("/stats", asyncHandler(getStats));

router.get("/:id", asyncHandler(getApplicationById));

router.get("/", asyncHandler(getApplications));

router.post("/", asyncHandler(createApplication));

router.put("/:id", asyncHandler(updateApplication));

router.delete("/:id", asyncHandler(deleteApplication));

export default router;
