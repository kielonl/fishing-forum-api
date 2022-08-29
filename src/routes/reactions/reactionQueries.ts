import prisma from "../../prisma";
import { ReactionInfo } from "../../types";

export const insertReactionQuery = async (reactionInfo: ReactionInfo) => {
  const query = await prisma.reactions.create({
    data: {
      user_id: reactionInfo.user_id,
      value: reactionInfo.value,
      post_id: reactionInfo.post_id,
    },
  });
  return query;
};

export const uniqueReactionQuery = async (reactionInfo: ReactionInfo) => {
  // return `SELECT COUNT(*) FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
  const query = await prisma.reactions.count({
    where: {
      AND: {
        post_id: reactionInfo.post_id,
        user_id: reactionInfo.user_id,
      },
    },
  });
  return query;
};

export const removeReactionQuery = async (reactionInfo: ReactionInfo) => {
  // return `DELETE FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
  const query = await prisma.reactions.deleteMany({
    where: {
      AND: { post_id: reactionInfo.post_id, user_id: reactionInfo.user_id },
    },
  });
  return query;
};

export const selectReactionsQuery = async (post_id: string) => {
  return `SELECT * FROM public.reactions INNER JOIN public.post ON 'reactions.post_id' = '${post_id}'`;
};

export const userExistsByUUID = async (userUUID: string) => {
  // return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
  const query = await prisma.user.count({
    where: {
      user_id: userUUID,
    },
  });
  return query;
};
