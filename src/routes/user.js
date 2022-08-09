const { dbQuery } = require("../database/database");

const {
  insertQuery,
  selectQuery,
  selectUserByUUIDQuery,
} = require("../database/queries.js");

const {
  usernameValidation,
  passwordValidation,
  checkForUUID,
} = require("../database/validation");

module.exports = function (app) {
  app.post("/user", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectQuery("public.user"));
    return { data: res };
  });
  //get user by uuid
  app.post("/user/:id", async (request, response) => {
    response.type("application/json").code(200);
    const res = await dbQuery(selectUserByUUIDQuery(request.params.id));
    return { data: res };
  });

  app.post("/user/create", async (request, response) => {
    const name = request.body;

    const res = await dbQuery(
      insertQuery(
        request.body.uuid,
        request.body.username,
        request.body.password,
        request.body.yearsOfExperience,
        request.body.addressId,
        request.body.hasFishingCard,
        request.body.biggestCatch,
        new Date().toLocaleString()
      )
    );
    response.code(201).send({ data: res });
  });
};
