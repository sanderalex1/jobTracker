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
    const { company, role, location, status, applied_date } = req.body;
    const id = crypto.randomUUID();
    const result = await pool.query(
      "INSERT INTO applications (id, company, role, location, status, applied_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, company, role, location, status, applied_date],
    );
    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const { company, role, location, status, applied_date } = req.body;
    const result = await pool.query(
      "UPDATE applications SET company = $2, role = $3, location = $4, status = $5, applied_date = $6 WHERE id = $1 RETURNING *",
      [id, company, role, location, status, applied_date],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.status(200).json({
      message: "The application was deleted",
      deleted: result.rows[0],
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
