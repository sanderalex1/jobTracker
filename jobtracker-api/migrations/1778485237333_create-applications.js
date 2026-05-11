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
    "applications",
    {
      id: { type: "uuid", primaryKey: true },
      company: { type: "text", notNull: true },
      role: { type: "text", notNull: true },
      location: { type: "text", notNull: true },
      status: { type: "varchar(20)", notNull: true },
      applied_date: { type: "date", notNull: true },
      follow_up_date: { type: "date", notNull: false },
      notes: { type: "text", notNull: false },
      link: { type: "text", notNull: false },
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
  pgm.dropTable("applications");
};
