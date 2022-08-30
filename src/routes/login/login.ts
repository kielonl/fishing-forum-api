import { fastify } from "../../index";
import createError from "http-errors";

import { Login, UserCredentials, UserInfo } from "../../types";
import { userInfoValidation } from "./loginValidation";
import { loginQuery } from "./loginQueries";

export default function login() {
  fastify.post<{ Body: UserCredentials }>(
    "/auth/login",
    async (request, response) => {
      let userInfo: UserCredentials = request.body;
      userInfo = userInfoValidation(userInfo);

      const res: Login | null = await loginQuery(userInfo);
      if (res === null) throw createError(403, "incorrect credentials");
      response.code(200).send([res]);
    }
  );
}
