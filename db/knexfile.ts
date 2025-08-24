import type { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.POSTGRES_DB_URL!,
      ssl: { rejectUnauthorized: false }, // needed for Supabase
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
      extension: "ts",
    },
  },
};

export default config;
