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
    "search_config",
    {
      id: { type: "uuid", primaryKey: true },
      type: { type: "text", notNull: true },
      value: { type: "text", notNull: true },
      source: { type: "text", notNull: true },
      created_at: { type: "timestamp", default: "now()" },
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
  pgm.dropTable("search_config");
};
