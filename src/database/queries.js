const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.date}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}','${userInfo.date}') RETURNING *`;
};

const insertPostQuery = (postInfo) => {
  return `INSERT INTO public.post (title,content,author,image) VALUES ('${postInfo.post.title}','${postInfo.post.content}','${postInfo.post.author}','${postInfo.post.image}') RETURNING *`;
};

const uniqueReactionQuery = (reactionInfo) => {
  return `SELECT COUNT(*) FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

const insertReactionQuery = (reactionInfo) => {
  return `INSERT INTO public.reactions (user_id,post_id,value) VALUES ('${reactionInfo.user_id}','${reactionInfo.post_id}','${reactionInfo.value}')RETURNING *`;
};

const removeReactionQuery = (reactionInfo) => {
  return `DELETE FROM public.reactions WHERE post_id = '${reactionInfo.post_id}' AND user_id = '${reactionInfo.user_id}'`;
};

const countReactionsQuery = (post_id) => {
  return `SELECT COUNT(value) FROM public.reactions WHERE post_id = '${post_id}'`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

const userExistsByUUID = (userUUID) => {
  return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
};

const selectReactionsQuery = (post_id) => {
  // return ` (SELECT * FROM public.reactions) UNION ALL (SELECT * from public.post) `;
  return `SELECT * FROM public.reactions INNER JOIN public.post ON 'reactions.post_id' = '${post_id}'`;
};

const selectQueryWithCondition = (table, parameter1, parameter2) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

const loginQuery = (userInfo) => {
  return `SELECT username,user_id FROM public.user WHERE username='${userInfo.username}' AND password = '${userInfo.password}'`;
};

const getUserDetailsQuery = (username, password) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};
module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoDetailsQuery = insertIntoDetailsQuery;
module.exports.insertPostQuery = insertPostQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectQueryWithCondition = selectQueryWithCondition;
module.exports.appendUUIDToUser = appendUUIDToUser;
module.exports.loginQuery = loginQuery;
module.exports.getUserDetailsQuery = getUserDetailsQuery;
module.exports.userExistsByUUID = userExistsByUUID;
module.exports.insertReactionQuery = insertReactionQuery;
module.exports.uniqueReactionQuery = uniqueReactionQuery;
module.exports.removeReactionQuery = removeReactionQuery;
module.exports.countReactionsQuery = countReactionsQuery;
module.exports.selectReactionsQuery = selectReactionsQuery;
