import pool from "../db/pool.js";

export const fetchJobs = async ({ page = 1, limit = 10 }) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  let offset = (pageNum - 1) * limitNum;

  const query = `SELECT id, title, company, location, salary, description, link, posted_date 
                 FROM scraped_jobs 
                 WHERE is_applied = false
                 LIMIT $1 OFFSET $2`;

  const countQuery = `SELECT COUNT(*) FROM scraped_jobs WHERE is_applied = false`;

  const result = await pool.query(query, [limitNum, offset]);
  const countResult = await pool.query(countQuery);
  const total = parseInt(countResult.rows[0].count);

  return { rows: result.rows, total };
};

export const markAsApplied = async (id) => {
  const result = await pool.query(
    `UPDATE scraped_jobs SET is_applied = true WHERE id = $1 RETURNING *`,
    [id],
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
};
