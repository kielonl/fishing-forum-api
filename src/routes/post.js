const createError = require("http-errors");

const { dbQuery } = require("../database/database");

const { postValidation } = require("../database/validation");

module.exports = function (app) {
  app.post("/post/create", async (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST");

    const data = request.body;
    const res = await postValidation(data);
    response.code(201).send({ result: res });

    app.get("/post", (request, response) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET");

      response.code(200).send({ result: "sefasdf" });
    });
  });
};
