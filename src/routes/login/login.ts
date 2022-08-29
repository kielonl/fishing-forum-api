import { FastifyInstance } from "fastify";
import createError from "http-errors";

import { UserCredentials, UserInfo } from "../../types";
// import { dbQuery } from "../../database/database";
import { userInfoValidation } from "./loginValidation";
import { loginQuery } from "./loginQueries";
import { user } from "@prisma/client";

export default function (app: FastifyInstance) {
  app.post<{ Body: UserCredentials }>(
    "/auth/login",
    async (request, response) => {
      let userInfo: UserCredentials = request.body;
      userInfo = userInfoValidation(userInfo);

      const res: user | null = await loginQuery(userInfo);
      if (res === null) throw createError(403, "incorrect credentials");
      response.code(200).send(res);
    }
  );
}