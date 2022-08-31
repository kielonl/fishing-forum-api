import createError from "http-errors";

import prisma from "../../prisma";
import { Comment } from "../../types";

export const parentValidationQuery = async (parent_id: string) => {
  const query = await prisma.post.count({
    where: {
      post_id: parent_id,
    },
  });
  return query;
};

export const addCommentQuery = async (commentInfo: Comment) => {
  const query = await prisma.comment.create({
    data: {
      parent_id: commentInfo.parent_id,
      user_id: commentInfo.user_id,
      content: commentInfo.content,
    },
  });
  if (query === null) {
    throw createError(401, "invalid");
  }
  return query;
};
