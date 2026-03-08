import { Migration } from "@/types/db";

export const migrations : Migration[] = [
    {
        id: "001",
        up: async (knex) => {
            await knex.schema.createTable("user" , (t)=>{
                t.string("id").primary();
                t.string("email");
                t.string("first_name");
                t.string("last_name");
                t.timestamps(true,true);
                t.boolean("deleted").defaultTo(false);
            }) 
            await knex.raw(`ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;`);
        },
        down: async (knex) => {
            await knex.schema.dropTableIfExists("user");
        }
    }
]