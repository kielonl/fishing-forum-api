const { reactionValidation, checkUser } = require("./reactionValidation");

module.exports = (app) => {
  app.post("/reaction/add", async (request, response) => {
    const userInfo = request.body;
    const userValid = await checkUser(userInfo);
    if (userValid) {
      const cos = await reactionValidation(userInfo);
      response.code(200).send({ result: cos });
    }
  });
};
