const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "forum",
});
client.connect();

const dbQuery = async (query) => {
  const result = await client.query(query);
  // await client.end();
  console.log(result.rows);
  return result.rows;
};
module.exports.dbQuery = dbQuery;
