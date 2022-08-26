const insertReactionQuery = (reactionInfo) => {
  return `INSERT INTO public.reactions (user_id,post_id,value) VALUES ('${reactionInfo.user_id}','${reactionInfo.post_id}','${reactionInfo.value}')RETURNING *`;
};

const uniqueReactionQuery = (reactionInfo) => {
  return `SELECT COUNT(*) FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

const removeReactionQuery = (reactionInfo) => {
  return `DELETE FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

const selectReactionsQuery = (post_id) => {
  return `SELECT * FROM public.reactions INNER JOIN public.post ON 'reactions.post_id' = '${post_id}'`;
};

const userExistsByUUID = (userUUID) => {
  return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
};

module.exports.insertReactionQuery = insertReactionQuery;
module.exports.uniqueReactionQuery = uniqueReactionQuery;
module.exports.removeReactionQuery = removeReactionQuery;
module.exports.selectReactionsQuery = selectReactionsQuery;
module.exports.userExistsByUUID = userExistsByUUID;
