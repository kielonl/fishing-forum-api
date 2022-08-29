import { ReactionInfo } from "../../types";


export const insertReactionQuery = (reactionInfo:ReactionInfo) => {
  return `INSERT INTO public.reactions (user_id,post_id,value) VALUES ('${reactionInfo.user_id}','${reactionInfo.post_id}','${reactionInfo.value}')RETURNING *`;
};

export const uniqueReactionQuery = (reactionInfo:ReactionInfo) => {
  return `SELECT COUNT(*) FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

export const removeReactionQuery = (reactionInfo:ReactionInfo) => {
  return `DELETE FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

export const selectReactionsQuery = (post_id:string) => {
  return `SELECT * FROM public.reactions INNER JOIN public.post ON 'reactions.post_id' = '${post_id}'`;
};

export const userExistsByUUID = (userUUID:string) => {
  return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
};


