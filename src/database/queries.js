const insertQuery = (userInfo, table) => {
  return `INSERT INTO public.${table} (username,password,years_of_experience,has_fishing_card,biggest_catch,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.yearsOfExperience}','${userInfo.hasFishingCard}','${userInfo.biggestCatch}','${userInfo.date}')`;
};

const selectQuery = (table) => {
  return `SELECT * from ${table}`;
};

const selectUserByUUIDQuery = (uuid) => {
  return `SELECT * from public.user WHERE user_id = '${uuid}' `;
};

module.exports.insertQuery = insertQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectUserByUUIDQuery = selectUserByUUIDQuery;
