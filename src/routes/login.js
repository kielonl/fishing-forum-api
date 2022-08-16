const createError = require("http-errors");

const { dbQuery } = require("../database/database");
const { passwordHashing } = require("../database/validation");
const { loginQuery, getUserDetailsQuery } = require("../database/queries");

module.exports = function (app) {
  app.post("/auth/login", async (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST");

    const userInfo = request.body;

    const res = await dbQuery(
      loginQuery(userInfo.username, passwordHashing(userInfo.password))
    );

    if (!res) throw createError(403, "incorrect credentials");
    response.code(200).send({ result: res });
  });
};
