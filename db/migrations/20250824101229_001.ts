import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return (async (knex) => {
    await knex.schema.createTable("user", (t) => {
      t.string("id").primary();
      t.string("email");
      t.string("first_name");
      t.string("last_name");
      t.timestamps(true, true);
      t.boolean("deleted").defaultTo(false);
    });
    await knex.raw(`ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;`);
  })(knex);
}

export async function down(knex: Knex): Promise<void> {
  return (async (knex) => {
    await knex.schema.dropTableIfExists("user");
  })(knex);
}
