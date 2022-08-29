import createError from "http-errors";
import { ReactionInfo, UserInfo } from "../../types";

import {
  userExistsByUUID,
  uniqueReactionQuery,
  removeReactionQuery,
  insertReactionQuery,
} from "./reactionQueries";

const checkUser = async (userInfo: UserInfo) => {
  const isUser = await dbQuery(userExistsByUUID(userInfo.user_id));
  if (parseInt(isUser[0].count) === 0) {
    throw createError(400, "invalid user");
  }
  return true;
};

const reactionValidation = async (reactionInfo: ReactionInfo) => {
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
