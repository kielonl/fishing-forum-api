const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.date}') RETURNING *`;
};
const insertIntoDetailsQuery = (userInfo) => {
  return `INSERT INTO public.details (country,city,voivodeship,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.voivodeship}','${userInfo.date}') RETURNING *`;
};

const appendUUIDToUser = (userUUID, detailsUUID) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table}`;
};

const selectQueryWithCondition = (table, parameter1, parameter2) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoDetailsQuery = insertIntoDetailsQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectQueryWithCondition = selectQueryWithCondition;
module.exports.appendUUIDToUser = appendUUIDToUser;
