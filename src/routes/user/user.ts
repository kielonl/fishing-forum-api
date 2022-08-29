import { FastifyInstance } from "fastify";
import { dbQuery } from "../../database/database";

import { DetailsInfo, IdParam, UserCredentials, UserInfo } from "../../types";

import {
  insertIntoUserQuery,
  selectQuery,
  insertIntoDetailsQuery,
  appendUUIDToUser,
  selectUserByUUIDQuery,
} from "./userQueries";

import { detailsValidation, userRegistration } from "./userValidation";

module.exports = function (app: FastifyInstance) {
  app.get("/user", async (request, response) => {
    const res = await dbQuery(selectQuery("public.user"));
    response.code(200).send({ data: res });
  });
  //get user by uuid
  app.get<{ Params: IdParam }>("/user/:id", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectUserByUUIDQuery(request.params.uuid));
    response.code(200).send({ data: res });
  });

  app.post<{ Body: UserCredentials }>("/user", async (request, response) => {
    const user = await userRegistration(request.body);
    const res = await insertIntoUserQuery(user);
    response.code(201).send({ data: res });
  });
  app.post<{ Body: DetailsInfo }>(
    "/user/details",
    async (request, response) => {
      const details = await detailsValidation(request.body);
      const responseFromDetails = await dbQuery(
        insertIntoDetailsQuery(details)
      );
      const responseFromUser = await dbQuery(
        appendUUIDToUser(details.uuid, responseFromDetails[0].details_id)
      );
      response.code(201).send({ responseFromDetails, responseFromUser });
    }
  );
};
