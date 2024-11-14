const { defineConfig } = require("drizzle-kit");
const dbCredentials = require("./server/db/dbCredentials");

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema.js",
  dialect: "postgresql",
  dbCredentials,
});
