const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.date}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}','${userInfo.date}') RETURNING *`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

const getUserByUUID = (userUUID) => {
  return `SELECT * from public.user where user_id = '${userUUID}'`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table}`;
};

const selectQueryWithCondition = (table, parameter1, parameter2) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

const loginQuery = (username, password) => {
  return `SELECT username,user_id FROM public.user WHERE username='${username}' AND password = '${password}'`;
};

const getUserDetailsQuery = (username, password) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};
module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoDetailsQuery = insertIntoDetailsQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectQueryWithCondition = selectQueryWithCondition;
module.exports.appendUUIDToUser = appendUUIDToUser;
module.exports.loginQuery = loginQuery;
module.exports.getUserDetailsQuery = getUserDetailsQuery;
module.exports.getUserByUUID = getUserByUUID;
