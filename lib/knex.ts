import knex from "knex";
import config from "../db/knexfile";

const environment = process.env.NODE_ENV || "development";

const db = knex(config[environment]);

export default db;
