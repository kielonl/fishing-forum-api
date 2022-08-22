const createError = require("http-errors");

const { dbQuery } = require("../database/database");

const { postValidation } = require("../database/validation");

const { insertPostQuery, selectQuery } = require("../database/queries");

module.exports = function (app) {
  app.post("/post/create", async (request, response) => {
    const data = request.body;
    const res = await postValidation(data);
    const query = await dbQuery(insertPostQuery(res));

    response.code(201).send({ result: query });
  });
  app.get("/post", async (request, response) => {
    const query = await dbQuery(selectQuery("public.post"));
    response.code(200).send({ result: query });
  });
};
