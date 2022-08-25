const createError = require("http-errors");

const { dbQuery } = require("../../database/database");

const {
  userExistsByUUID,
  uniqueReactionQuery,
  removeReactionQuery,
  insertReactionQuery,
} = require("./reactionQueries");

const checkUser = async (userInfo) => {
  const isUser = await dbQuery(userExistsByUUID(userInfo.user_id));
  if (parseInt(isUser[0].count) === 0) {
    throw createError(400, "invalid user");
  }
  return true;
};

const reactionValidation = async (reactionInfo) => {
  console.log(reactionInfo);
  const uniqueReaction = await dbQuery(uniqueReactionQuery(reactionInfo));
  if (uniqueReaction[0].count === "1") {
    const removeReaction = await dbQuery(removeReactionQuery(reactionInfo));
    return removeReaction;
  }
  const insertReaction = await dbQuery(insertReactionQuery(reactionInfo));
  return insertReaction;
};

module.exports.reactionValidation = reactionValidation;
module.exports.checkUser = checkUser;
