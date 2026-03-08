import type { Knex } from "knex";

type Migration = {
    id: string,
    up: (knex:Knex) => Promise<void>
    down?: (knex:Knex) => Promise<void> 
}