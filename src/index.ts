import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});
const port = 8080;
require("./routes/user/user")(fastify);
require("./routes/login/login")(fastify);
require("./routes/best/best")(fastify);
require("./routes/post/post")(fastify);
require("./routes/reactions/reactions")(fastify);

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
