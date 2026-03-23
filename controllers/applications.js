import pool from "../db/pool.js";

export const getApplications = async (req, res) => {
  try {
    const { status } = req.query;
    let query = "...";
    let params = [];
    if (!status) {
      query = "SELECT id, company, role, status FROM applications";
    } else {
      query =
        "SELECT id, company, role, status FROM applications WHERE status = $1";
      params = [status];
    }

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { company, role } = req.body;
    const result = await pool.query(
      "INSERT INTO applications (company, role) VALUES ($1, $2) RETURNING *",
      [company, role],
    );
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateApplication = async (req, res) => {
  const applicationData = req.params.id;
  console.log(applicationData);
  res.json({ message: "No real data yet" });
};

export const deleteApplication = async (req, res) => {
  const applicationData = req.params.id;
  console.log(applicationData);
  res.json({ message: "No real data yet" });
};
