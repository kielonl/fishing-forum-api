import { Client } from "pg";

require("dotenv").config();

const client = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
client.connect();

export const dbQuery = async (query: any) => {
  const result = await client.query(query);
  return result.rows;
};
module.exports.dbQuery = dbQuery;
