import "dotenv/config";
import pool from "./pool.js";
import { mockApplications } from "../mockData.js";

const seed = async () => {
  for (const app of mockApplications) {
    await pool.query(
      `INSERT INTO applications (id, company, role, location, status, applied_date, follow_up_date, notes, link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING`,
      [
        app.id, // $1 → id
        app.company, // $2 → company
        app.role, // $3 → role
        app.location, // $4 → location
        app.status, // $5 → status
        app.appliedDate, // $6 → applied_date
        app.followUpDate, // $7 → follow_up_date
        app.notes, // $8 → notes
        app.link, // $9 → link
      ],
    );
  }
  console.log("Seeded!");
  process.exit(0);
};

seed();
