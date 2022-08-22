const { dbQuery } = require("../database/database");
const { reactionValidation } = require("../database/validation");
const { getReactionByUUID, addReactionQuery } = require("../database/queries");

module.exports = function (app) {
  app.get("/reaction/:id", async (request, response) => {
    const result = await dbQuery(getReactionByUUID(request.params.id));
    response.code(200).send({ result: result });
  });

  app.post("/reaction/add", async (request, response) => {
    const requestInfo = request.body;
    const res = await reactionValidation(requestInfo);
    console.log(res);
    const result = await dbQuery(addReactionQuery(res));
    response.code(200).send({ result: "123" });
  });
};
