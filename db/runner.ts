import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { knex } from "knex";
import config from "./knexfile";
import { migrations } from "./migration";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const db = knex(config[env]);

async function generateMigrationFiles() {
  const dir = path.resolve(__dirname, "migrations");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const migration of migrations) {
    const existing = fs
      .readdirSync(dir)
      .find((file) => file.includes(`_${migration.id}.ts`));

    if (existing) {
      console.log(`Migration already exists: ${existing}`);
      continue;
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);
    const filename = `${timestamp}_${migration.id}.ts`;
    const filepath = path.join(dir, filename);

    const content = `import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return (${migration.up.toString()})(knex);
}

export async function down(knex: Knex): Promise<void> {
  ${
    migration.down
      ? `return (${migration.down.toString()})(knex);`
      : "return Promise.resolve();"
  }
}
`;
    fs.writeFileSync(filepath, content, "utf8");
    console.log("Created migration:", filename);
  }
}

async function runMigrations(
  direction: "up" | "down",
  steps?: number
) {
  const migs = migrations.slice(); // copy

  if (direction === "down") {
    migs.reverse();
  }

  const slice = steps ? migs.slice(0, steps) : migs;

  for (const migration of slice) {
    if (direction === "up") {
      await migration.up(db);
      console.log(`Applied migration: ${migration.id}`);
    } else if (migration.down) {
      await migration.down(db);
      console.log(`Rolled back migration: ${migration.id}`);
    }
  }

  await db.destroy();
}

(async () => {
  const flag = process.argv[2]; // --up or --down
  const steps = process.argv[3] ? parseInt(process.argv[3]) : undefined;

  if (steps && isNaN(steps)) {
    console.error("Steps must be a number");
    process.exit(1);
  }

  await generateMigrationFiles();

  if (flag === "--up") {
    await runMigrations("up", steps);
  } else if (flag === "--down") {
    await runMigrations("down", steps);
  } else {
    console.log(
      "Usage:\n" +
        "  tsx runner.ts --up [n]      # run n migrations (or all if omitted)\n" +
        "  tsx runner.ts --down [n]    # rollback n migrations (or all if omitted)"
    );
  }
})();
