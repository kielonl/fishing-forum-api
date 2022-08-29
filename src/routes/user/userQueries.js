const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password) VALUES('${userInfo.username}','${userInfo.password}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}') RETURNING *`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
};

const selectQueryWithCondition = (table, parameter1, parameter2) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

const getUserDetailsQuery = (username, password) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};

const selectUserByUUIDQuery = (userUUID) => {
  return `SELECT * from public.user where user_id = '${userUUID}'`;
};

const checkUserByUsernameQuery = (username) => {
  return `SELECT count(*) from public.user where username = '${username}'`;
};

module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoDetailsQuery = insertIntoDetailsQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectQueryWithCondition = selectQueryWithCondition;
module.exports.appendUUIDToUser = appendUUIDToUser;
module.exports.getUserDetailsQuery = getUserDetailsQuery;
module.exports.selectUserByUUIDQuery = selectUserByUUIDQuery;
module.exports.checkUserByUsernameQuery = checkUserByUsernameQuery;
