const { dbQuery } = require("../../database/database");

const { postValidation, selectPosts } = require("./postValidation");

const { insertPostQuery } = require("./postQueries");

module.exports = function (app) {
  app.post("/post/create", async (request, response) => {
    const data = request.body;
    const res = await postValidation(data);
    const query = await dbQuery(insertPostQuery(res));

    response.code(201).send({ result: query });
  });
  app.get("/post/:uuid", async (request, response) => {
    const query = await selectPosts(request.params.uuid);
    response.code(200).send({ result: query });
  });
};
