import Fastify from "fastify";
import login from "./routes/login/login";
import { best } from "./routes/best/best";
import { post } from "./routes/post/post";
import { reactions } from "./routes/reactions/reactions";
import { user } from "./routes/user/user";
export const fastify = Fastify({
  logger: true,
});
const port = 8080;

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
login();
user();
reactions();
post();
best();
fastify.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`server is now listening on port ${port}`);
});
