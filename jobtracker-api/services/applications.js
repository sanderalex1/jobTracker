import pool from "../db/pool.js";

export const fetchApplications = async (status) => {
  let query = `SELECT id, company, role, location, status, applied_date AS "appliedDate", follow_up_date AS "followUpDate", notes, link FROM applications`;

  let params = [];

  if (status) {
    query += ` WHERE status = $1`;
    params = [status];
  }

  const result = await pool.query(query, params);

  return result.rows;
};

export const makeApplication = async ({
  company,
  role,
  location,
  status,
  appliedDate,
  followUpDate,
  notes,
  link,
}) => {
  const id = crypto.randomUUID();

  const result = await pool.query(
    `INSERT INTO applications (id, company, role, location, status, applied_date, follow_up_date, notes, link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, company, role, location, status,
  applied_date AS "appliedDate",
  follow_up_date AS "followUpDate",
  notes, link`,
    [
      id,
      company,
      role,
      location,
      status,
      appliedDate,
      followUpDate,
      notes,
      link,
    ],
  );
  return result.rows[0];
};

export const updateApplication = async (
  id,
  { company, role, location, status, appliedDate, followUpDate, notes, link },
) => {
  const result = await pool.query(
    `UPDATE applications SET company = $2, role = $3, location = $4, status = $5, applied_date = $6, follow_up_date = $7, notes = $8, link = $9 WHERE id = $1 RETURNING id, company, role, location, status,
  applied_date AS "appliedDate",
  follow_up_date AS "followUpDate",
  notes, link`,
    [
      id,
      company,
      role,
      location,
      status,
      appliedDate,
      followUpDate,
      notes,
      link,
    ],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const deleteApplication = async (id) => {
  const result = await pool.query(
    "DELETE FROM applications WHERE id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};
