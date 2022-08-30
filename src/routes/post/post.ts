import { postValidation, selectPosts } from "./postValidation";

import { insertPostQuery } from "./postQueries";
import { fastify } from "../..";
import { IdParam, PostInfo } from "../../types";

export const post = () => {
  fastify.post<{ Body: PostInfo }>(
    "/post/create",
    async (request, response) => {
      const data = request.body;
      const res = await postValidation(data);
      const query = await insertPostQuery(res);

      response.code(201).send({ result: query });
    }
  );

  fastify.get<{ Params: IdParam }>("/post/:uuid", async (request, response) => {
    const query = await selectPosts(request.params.uuid);
    response.code(200).send({ result: query });
  });
};
