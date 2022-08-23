const createError = require("http-errors");

const { dbQuery } = require("../database/database");

const { postValidation, selectPosts } = require("../database/validation");

const {
  insertPostQuery,
  selectQuery,
  selectReactionsQuery,
} = require("../database/queries");

module.exports = function (app) {
  app.post("/post/create", async (request, response) => {
    const data = request.body;
    const res = await postValidation(data);
    const query = await dbQuery(insertPostQuery(res));

    response.code(201).send({ result: query });
  });
  app.post("/post", async (request, response) => {
    console.log(request.body);
    const query = selectPosts(request.body);

    response.code(200).send({ result: query });
  });
};
