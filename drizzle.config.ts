import { defineConfig } from "drizzle-kit";

// Params list: https://orm.drizzle.team/kit-docs/conf
export default defineConfig({
  schema: "./src/lib/db.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
  out: "./migrations",
});
