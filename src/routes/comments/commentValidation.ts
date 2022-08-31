import createError from "http-errors";
import { Comment } from "../../types";
import { parentValidationQuery } from "./commentQueries";
import { userExistsByUUID } from "../post/postQueries";

const parentValidation = async (parent_id: string): Promise<boolean> => {
  const result = await parentValidationQuery(parent_id);
  if (result !== 1) throw createError(400, "there is no such post");
  return true;
};

const checkUser = async (user_id: string): Promise<boolean> => {
  const result = await userExistsByUUID(user_id);
  if (result !== 1) throw createError(400, "no such user");
  return true;
};

const checkContent = (content: string): boolean => {
  if (content.length < 3 || content.length > 200)
    throw createError(
      400,
      "message length must be between 3 and 200 characters"
    );
  return true;
};
export const commentValidation = async (commentInfo: Comment) => {
  await parentValidation(commentInfo.parent_id);
  await checkUser(commentInfo.user_id);
  checkContent(commentInfo.content);
  return true;
};
