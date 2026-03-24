import * as applicationService from "../services/applications.js";

export const getApplications = async (req, res) => {
  try {
    const { status } = req.query;

    return res.json(await applicationService.fetchApplications(status));
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createApplication = async (req, res) => {
  try {
    return res
      .status(201)
      .json(await applicationService.makeApplication(req.body));
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedApplication = await applicationService.updateApplication(
      id,
      req.body,
    );

    if (updatedApplication === null) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res.status(200).json(updatedApplication);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await applicationService.deleteApplication(id);
    if (deletedApplication === null) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({
      message: "The application was deleted",
      deleted: deletedApplication,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
