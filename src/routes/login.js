const createError = require("http-errors");

const { dbQuery } = require("../database/database");
const { passwordHashing } = require("../database/validation");
const { loginQuery, correctLoginQuery } = require("../database/queries");

module.exports = function (app) {
  app.post("/auth/login", async (request, response) => {
    const userInfo = request.body;
    const res = await dbQuery(
      loginQuery(userInfo.username, passwordHashing(userInfo.password))
    );

    if (parseInt(res[0].count) !== 1)
      throw createError(403, "incorrect credentials");
    const result = await dbQuery(
      getUserDetailsQuery(userInfo.username, passwordHashing(userInfo.password))
    );
    response.code(200).send(result);
  });
};
