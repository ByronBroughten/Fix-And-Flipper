const { drizzle } = require("drizzle-orm/node-postgres");
const schema = require("./schema");
const { generateDrizzleJson, generateMigration } = require("drizzle-kit/api");
const dbCredentials = require("./dbCredentials");
const pool = require("../modules/pool");

async function initDb() {
  const db = drizzle({
    ...dbCredentials,
    query: (string) => pool.query(string),
  });

  const migrationStatements = await generateMigration(
    generateDrizzleJson({}),
    generateDrizzleJson(schema)
  );

  // for (const key in schema) {
  //   await db.execute(`drop table if exists ${key}`);
  // }

  await db.execute(migrationStatements.join("\n"));
}

module.exports = initDb;
