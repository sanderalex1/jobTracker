import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../controllers/applications.js";

const router = Router();

router.get("/applications", getApplications);

router.post("/applications", createApplication);

router.put("/applications/:id", updateApplication);

router.delete("/applications/:id", deleteApplication);

export default router;
