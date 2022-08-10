const { dbQuery } = require("../database/database");

const {
  insertIntoUserQuery,
  selectQuery,
  //   selectUserByUUIDQuery,
  insertIntoDetailsQuery,
  appendUUIDToUser,
} = require("../database/queries.js");

const {
  userInfoValidation,
  detailsValidation,
} = require("../database/validation");

module.exports = function (app) {
  app.post("/user", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectQuery("public.user"));
    response.code(200).send({ data: res });
  });
  //get user by uuid
  app.post("/user/:id", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectUserByUUIDQuery(request.params.id));
    response.code(200).send({ data: res });
  });

  app.post("/user/createUser", async (request, response) => {
    const user = userInfoValidation(request.body);
    const res = await dbQuery(insertIntoUserQuery(user));
    response.code(201).send({ data: res });
  });
  app.post("/user/createDetails", async (request, response) => {
    const details = await detailsValidation(request.body);
    console.log(details);
    const res = await dbQuery(insertIntoDetailsQuery(details));
    console.log("------------");
    console.log(res);
    console.log("------------");
    const res1 = await dbQuery(
      appendUUIDToUser(
        "8f1a956a-dadf-47f6-8d52-bf7477c15b29",
        res[0].details_id
      )
    );
    response.code(201).send({ data: res, data1: res1 });
  });
};
