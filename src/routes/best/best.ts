import { FastifyInstance } from "fastify";

const { selectBest } = require("./bestValidation");

module.exports = function (app: FastifyInstance) {
  app.get("/best", async (request, response) => {
    const images = await selectBest();
    response.code(200).send(images);
  });
};
