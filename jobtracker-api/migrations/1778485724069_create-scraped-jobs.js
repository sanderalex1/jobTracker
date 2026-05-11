/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable(
    "scraped_jobs",
    {
      id: { type: "uuid", primaryKey: true },
      title: { type: "text", notNull: true },
      company: { type: "text", notNull: true },
      location: { type: "text", notNull: true },
      salary: { type: "text", notNull: false },
      description: { type: "text", notNull: false },
      link: { type: "text", unique: true, notNull: true },
      source: { type: "text", notNull: true },
      posted_date: { type: "date", notNull: false },
      scraped_at: { type: "timestamp", default: "now()" },
      is_applied: { type: "boolean", default: false },
    },
    { ifNotExists: true },
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("scraped_jobs");
};
