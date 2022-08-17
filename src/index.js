const fastify = require("fastify")({
  logger: true,
});
const port = 8080;
require("./routes/user")(fastify);
require("./routes/login")(fastify);
require("./routes/best")(fastify);
require("./routes/post")(fastify);

fastify.register((fastify, options, done) => {
  fastify.register(require("fastify-cors"), {
    origin: "*",
    methods: ["POST"],
  });
  done();
});
fastify.addHook("onRequest", (request, reply, done) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET");
  reply.header("Access-Control-Allow-Methods", "POST");
  done();
});
fastify.get("/", async (request, response) => {
  response.type("application/json").code(200);
  return { data: "" };
});

fastify.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`server is now listening on port ${port}`);
});
