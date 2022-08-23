const createError = require("http-errors");
const { reactionValidation, checkUser } = require("../database/validation");

module.exports = (app) => {
  app.post("/reaction/add", async (request, response) => {
    const userInfo = request.body;
    const userValid = await checkUser(userInfo);
    if (userValid) {
      const cos = reactionValidation(userInfo);
      response.code(200).send({ result: cos });
    }
  });
};
