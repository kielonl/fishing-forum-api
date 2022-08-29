import createError from "http-errors";
import { ReactionInfo, UserInfo } from "../../types";
import { dbQuery } from "../../database/database";
import {
  userExistsByUUID,
  uniqueReactionQuery,
  removeReactionQuery,
  insertReactionQuery,
} from "./reactionQueries";

export const checkUser = async (userInfo: UserInfo) => {
  const isUser: number = await userExistsByUUID(userInfo.user_id);
  if (!isUser) {
    throw createError(400, "invalid user");
  }
  return true;
};

export const reactionValidation = async (reactionInfo: ReactionInfo) => {
  const uniqueReaction = await uniqueReactionQuery(reactionInfo);
  if (uniqueReaction) {
    const removeReaction = await removeReactionQuery(reactionInfo);
    return removeReaction;
  }
  const insertReaction = await insertReactionQuery(reactionInfo); //do poprawki
  return insertReaction;
};
