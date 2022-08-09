// const insertQuery = (
//   uuid,
//   username,
//   password,
//   yearsOfExperience,
//   addressId,
//   hasFishingCard,
//   biggestCatch,
//   createdAt
// ) => {
//   return `INSERT INTO public.user (user_id,username,password,years_of_experience,address_id,has_fishing_card,biggest_catch,created_at) VALUES('${uuid}','${username}','${password}','${yearsOfExperience}','${addressId}','${hasFishingCard}','${biggestCatch}','${createdAt}')`;
// };

const insertQuery = (user) => {
  return `INSERT INTO public.user (user_id,username,password,years_of_experience,address_id,has_fishing_card,biggest_catch,created_at) VALUES('${user.uuid}','${user.username}','${user.password}','${user.yearsOfExperience}','${user.addressId}','${user.hasFishingCard}','${user.biggestCatch}','${user.date}')`;
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
