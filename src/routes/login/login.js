const createError = require("http-errors");

const { dbQuery } = require("../../database/database");
const { userInfoValidation } = require("./loginValidation");
const { loginQuery } = require("./loginQueries");

module.exports = function (app) {
  app.post("/auth/login", async (request, response) => {
    let userInfo = request.body;
    userInfo = userInfoValidation(userInfo);

    const res = await dbQuery(loginQuery(userInfo));
    if (res.length === 0) throw createError(403, "incorrect credentials");
    response.code(200).send(res);
  });
};
