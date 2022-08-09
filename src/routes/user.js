const { dbQuery } = require("../database/database");

const {
  insertQuery,
  selectQuery,
  selectUserByUUIDQuery,
} = require("../database/queries.js");

const { userInfoValidation } = require("../database/validation");

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

  app.post("/user/create", async (request, response) => {
    let user = request.body;
    user = userInfoValidation(user);
    user.date = new Date().toLocaleString();
    console.log("--------");
    console.log(insertQuery(user));
    console.log("--------");

    const res = await dbQuery(insertQuery(user));

    response.code(201).send({ data: res });
  });
};
