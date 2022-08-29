import { FastifyInstance } from "fastify";
import createError from "http-errors";

import { UserInfo } from "../../types";
// import { dbQuery } from "../../database/database";
import { userInfoValidation } from "./loginValidation";
import { loginQuery } from "./loginQueries";
import { user } from "@prisma/client";

type UserCredentials = Omit<UserInfo, "date">;

export default function (app: FastifyInstance) {
  app.post<{ Body: UserInfo }>("/auth/login", async (request, response) => {
    let userInfo = request.body;
    userInfo = userInfoValidation(userInfo);

    const res: user | null = await loginQuery(userInfo);
    if (res === null) throw createError(403, "incorrect credentials");
    response.code(200).send(res);
  });
}
