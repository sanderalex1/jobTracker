import pool from "../db/pool.js";

export const fetchApplications = async ({
  status,
  search,
  page = 1,
  limit = 10,
}) => {
  let query = `SELECT id, company, role, location, status, applied_date AS "appliedDate", follow_up_date AS "followUpDate", notes, link FROM applications`;

  let params = [];
  let conditions = [];
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  let offset = (pageNum - 1) * limitNum;

  // Filtering by status
  if (status) {
    conditions.push(`status = $${params.length + 1}`);
    params.push(status);
  }

  // Filtering by company or role or location
  if (search) {
    conditions.push(
      `(company ILIKE $${params.length + 1} OR role ILIKE $${params.length + 1} OR location ILIKE $${params.length + 1})`,
    );
    params.push(`%${search}%`);
  }

  if (conditions.length !== 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  // Counting the total number of matching rows, so frontend knows how many pages exist
  const countParams = [...params];

  let countQuery = "SELECT COUNT(*) FROM applications";

  if (conditions.length !== 0) {
    countQuery =
      "SELECT COUNT(*) FROM applications" +
      " WHERE " +
      conditions.join(" AND ");
  }

  const limitIndex = params.length + 1; // capture before pushing
  const offsetIndex = params.length + 2; // capture before pushing

  //Pushing the limit and offset into params only now because order matters
  params.push(limit);
  params.push(offset);

  //checking limit and offset
  query += ` LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

  const result = await pool.query(query, params);
  const countResult = await pool.query(countQuery, countParams);
  const total = parseInt(countResult.rows[0].count);

  return { rows: result.rows, total };
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
