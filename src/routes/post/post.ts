import { postValidation, selectPosts } from "./postValidation";

import { insertPostQuery } from "./postQueries";
import { FastifyInstance } from "fastify";
import { dbQuery } from "../../database/database";
import { IdParam, PostInfo } from "../../types";

module.exports = function (app: FastifyInstance) {
  app.post<{ Body: PostInfo }>("/post/create", async (request, response) => {
    const data = request.body;
    const res = await postValidation(data);
    const query = await dbQuery(insertPostQuery(res.post));

    response.code(201).send({ result: query });
  });
  app.get<{ Params: IdParam }>("/post/:uuid", async (request, response) => {
    const query = await selectPosts(request.params.uuid);
    response.code(200).send({ result: query });
  });
};
