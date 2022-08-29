import { fastify } from "../..";
import { selectBest } from "./bestValidation";

export const best = () => {
  fastify.get("/best", async (request, response) => {
    const images = await selectBest();
    response.code(200).send(images);
  });
};
