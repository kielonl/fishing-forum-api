const insertIntoUserQuery = (userInfo) => {
  return `INSERT INTO public.user (username,password,years_of_experience,has_fishing_card,biggest_catch,created_at) VALUES('${userInfo.username}','${userInfo.password}','${userInfo.yearsOfExperience}','${userInfo.hasFishingCard}','${userInfo.biggestCatch}','${userInfo.date}')`;
};
const insertIntoAddressQuery = (userInfo) => {
  return `INSERT INTO public.address (country,city,voivodeship,created_at) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.voivodeship}','${userInfo.date}')`;
};

const selectQuery = (table) => {
  return `SELECT * from ${table}`;
};

const selectUserByUUIDQuery = (uuid) => {
  return `SELECT * from public.user WHERE user_id = '${uuid}' `;
};

module.exports.insertIntoUserQuery = insertIntoUserQuery;
module.exports.insertIntoAddressQuery = insertIntoAddressQuery;
module.exports.selectQuery = selectQuery;
module.exports.selectUserByUUIDQuery = selectUserByUUIDQuery;
