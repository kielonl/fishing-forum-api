import { fastify } from "../..";
import { Comment } from "../../types";
import { commentValidation } from "./commentValidation";
import { addCommentQuery } from "./commentQueries";

export const comments = () => {
  fastify.post<{ Body: Comment }>(
    "/post/comment",
    async (request, response) => {
      await commentValidation(request.body);
      const addComment = await addCommentQuery(request.body);
      response.code(200).send({ result: addComment });
    }
  );
};
