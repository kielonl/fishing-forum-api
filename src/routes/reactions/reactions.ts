import { fastify } from "../..";
import { ReactionInfo, UserInfo } from "../../types";

import { reactionValidation, checkUser } from "./reactionValidation";

export const reactions = async () => {
  fastify.post<{ Body: UserInfo }>(
    "/reaction/add",
    async (request, response) => {
      const userInfo = request.body;
      const userValid = await checkUser(userInfo);
      if (userValid) {
        const result = await reactionValidation(userInfo);
        response.code(200).send({ result: result });
      }
    }
  );
};
