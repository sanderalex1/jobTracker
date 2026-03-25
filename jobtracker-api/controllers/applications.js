import * as applicationService from "../services/applications.js";

export const getApplications = async (req, res) => {
  const { status, search, page, limit } = req.query;

  return res.json(await applicationService.fetchApplications(req.query));
};

export const createApplication = async (req, res) => {
  return res
    .status(201)
    .json(await applicationService.makeApplication(req.body));
};

export const updateApplication = async (req, res) => {
  const { id } = req.params;

  const updatedApplication = await applicationService.updateApplication(
    id,
    req.body,
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
