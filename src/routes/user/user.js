const { dbQuery } = require("../../database/database");

const {
  insertIntoUserQuery,
  selectQuery,
  insertIntoDetailsQuery,
  appendUUIDToUser,
  selectUserByUUIDQuery,
} = require("./userQueries");

const { detailsValidation } = require("./userValidation");
const { userInfoValidation } = require("../login/loginValidation");

module.exports = function (app) {
  app.get("/user", async (request, response) => {
    const res = await dbQuery(selectQuery("public.user"));
    response.code(200).send({ data: res });
  });
  //get user by uuid
  app.get("/user/:id", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectUserByUUIDQuery(request.params.id));
    response.code(200).send({ data: res });
  });

  app.post("/user/create", async (request, response) => {
    const user = userInfoValidation(request.body);
    const res = await dbQuery(insertIntoUserQuery(user));
    response.code(201).send({ data: res });
  });
  app.post("/user/details", async (request, response) => {
    const details = await detailsValidation(request.body);
    const responseFromDetails = await dbQuery(insertIntoDetailsQuery(details));
    const responseFromUser = await dbQuery(
      appendUUIDToUser(details.uuid, responseFromDetails[0].details_id)
    );
    response.code(201).send({ responseFromDetails, responseFromUser });
  });
};
