const insertQuery = (user) => {
  return `INSERT INTO public.user (username,password,years_of_experience,has_fishing_card,biggest_catch,created_at) VALUES('${user.username}','${user.password}','${user.yearsOfExperience}','${user.hasFishingCard}','${user.biggestCatch}','${user.date}')`;
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
