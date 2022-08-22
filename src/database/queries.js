const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.date}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}','${userInfo.date}') RETURNING *`;
};

const insertPostQuery = (postInfo) => {
  return `INSERT INTO public.post (title,content,author,image) VALUES ('${postInfo.title}','${postInfo.content}','${postInfo.author}','${postInfo.image}') RETURNING *`;
};

const addReactionQuery = (reactionInfo) => {
  return `INSERT INTO public.reactions (user_id,post_id,count) VALUES ('${reactionInfo.user_id}','${reactionInfo.post_id}','${reactionInfo.count}') RETURNING *`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

const getUserByUUID = (userUUID) => {
  return `SELECT * FROM public.user WHERE user_id = '${userUUID}'`;
};

const getPostByUUID = (postUUID) => {
  return `SELECT count(*) FROM public.post WHERE post_id = '${postUUID}'`;
};

const checkUserQuery = (userUUID) => {
  return `SELECT count(*) FROM public.user WHERE user_id = '${userUUID}'`;
};

const getCountQuery = (postUUID) => {
  return `SELECT count FROM public.reactions WHERE post_id = '${postUUID}' LIMIT 1 `;
};

const getReactionByPostUUID = (post_id) => {
  return `SELECT * from public.reactions WHERE post_id = '${post_id}'`;
};

const updateReactionCount = (reaction_id, count) => {
  return `UPDATE public.reactions SET count = '${count}' WHERE reaction_id = '${reaction_id}'`;
};

const selectQuery = (table) => {
  return `SELECT  * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
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
module.exports.getUserByUUID = getUserByUUID;
module.exports.getReactionByPostUUID = getReactionByPostUUID;
module.exports.addReactionQuery = addReactionQuery;
module.exports.getPostByUUID = getPostByUUID;
module.exports.checkUserQuery = checkUserQuery;
module.exports.getCountQuery = getCountQuery;
module.exports.updateReactionCount = updateReactionCount;
