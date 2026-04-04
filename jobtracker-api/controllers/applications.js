import * as applicationService from "../services/applications.js";
import { schema } from "../schemas/application.js";

export const getApplications = async (req, res) => {
  return res.json(await applicationService.fetchApplications(req.query));
};

export const createApplication = async (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  return res
    .status(201)
    .json(await applicationService.makeApplication(result.data));
};

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  const updatedApplication = await applicationService.updateApplication(
    id,
    result.data,
  );

  if (updatedApplication === null) {
    return res.status(404).json({ error: "Application not found" });
  }
  return res.status(200).json(updatedApplication);
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  const deletedApplication = await applicationService.deleteApplication(id);
  if (deletedApplication === null) {
    return res.status(404).json({ error: "Application not found" });
  }
  res.status(200).json({
    message: "The application was deleted",
    deleted: deletedApplication,
  });
};

export const getApplicationById = async (req, res) => {
  const { id } = req.params;
  const application = await applicationService.fetchApplicationById(id);
  if (application === null) {
    return res.status(404).json({ error: "Application not found" });
  }
  return res.status(200).json(application);
};

export const getStats = async (req, res) => {
  const status = await applicationService.getStats();

  return res.status(200).json(status);
};
