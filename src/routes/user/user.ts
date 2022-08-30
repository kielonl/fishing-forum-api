import { fastify } from "../..";

import { DetailsInfo, IdParam, UserCredentials } from "../../types";

import {
  insertIntoUserQuery,
  selectAllUsersQuery,
  insertIntoDetailsQuery,
  appendUUIDToUser,
  selectUserByUUIDQuery,
} from "./userQueries";

import { detailsValidation, userRegistration } from "./userValidation";

export function user() {
  fastify.get("/user", async (request, response) => {
    const res = await selectAllUsersQuery();
    response.code(200).send({ data: res });
  });
  //get user by uuid
  fastify.get<{ Params: IdParam }>("/user/:uuid", async (request, response) => {
    response.type("application/json").code(200);
    const res = await selectUserByUUIDQuery(request.params.uuid);
    response.code(200).send({ data: res });
  });

  fastify.post<{ Body: UserCredentials }>(
    "/user",
    async (request, response) => {
      const user = await userRegistration(request.body);
      const res = await insertIntoUserQuery(user);
      response.code(201).send({ data: res });
    }
  );
  fastify.post<{ Body: DetailsInfo }>(
    "/user/details",
    async (request, response) => {
      const details = await detailsValidation(request.body);
      const responseFromDetails = await insertIntoDetailsQuery(details);
      const responseFromUser = await appendUUIDToUser(
        details.uuid,
        responseFromDetails.details_id
      );
      response.code(201).send({ responseFromDetails, responseFromUser });
    }
  );
}
