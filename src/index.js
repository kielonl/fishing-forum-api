const fastify = require("fastify")({
  logger: true,
});
const port = 3000;
require("./routes/user")(fastify);
require("./routes/login")(fastify);

fastify.get("/", async (request, response) => {
  response.type("application/json").code(200);
  return { data: "" };
});

fastify.listen({ port: port }, (err, address) => {
  if (err) throw err;
  console.log(`server is now listening on port ${port}`);
});
