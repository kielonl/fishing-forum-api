const fastify = require("fastify")({
  logger: true,
});
const port = 3000;
require("./routes/user")(fastify);

const data = new Date();
const username = "ktos2";
const uuid = "08c40ef1-322d-48ac-aee0-ee10540dc975";
const password = "smiesznehaslo";
const yearsOfExperience = "10";
const addressId = "08c40ef1-322d-48ac-aee0-ee10540dc975";
const hasFishingCard = true;
const biggestCatch = "50";
const createdAt = data.toLocaleString();

fastify.get("/", async (request, response) => {
  response.type("application/json").code(200);
  return { data: "" };
});

fastify.listen({ port: port }, (err, address) => {
  if (err) throw err;
  console.log(`server is now listening on port ${port}`);
});
