const user = require("../routes/user");

const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.date}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}','${userInfo.date}') RETURNING *`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table}`;
};

const selectQueryWithCondition = (table, parameter1, parameter2) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

const loginQuery = (username, password) => {
  // return `SELECT user.username,details.country,details.city,details.street,details.years_of_experience,details.has_fishing_card,details.biggest_catch FROM user  INNER JOIN details ON user.details_id = details.details_id RETURNING *`;
  // return SELECT public.user.username,public.details.country,public.details.city,public.details.street,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE public.user.username = 'marek' AND public.user.password = '781567cb89ad83c367f5052c6c9a7c76ad77275f074c3b97d5aaf0f9a4ce7d93';
  return `SELECT count(*) FROM public.user WHERE username='${username}' AND password = '${password}'`;
};

const correctLoginQuery = (username, password) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};
module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoDetailsQuery = insertIntoDetailsQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectQueryWithCondition = selectQueryWithCondition;
module.exports.appendUUIDToUser = appendUUIDToUser;
module.exports.loginQuery = loginQuery;
module.exports.correctLoginQuery = correctLoginQuery;
