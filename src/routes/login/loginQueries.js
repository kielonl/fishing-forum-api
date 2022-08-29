const loginQuery = (userInfo) => {
  return `SELECT username,user_id FROM public.user WHERE username='${userInfo.username}' AND password = '${userInfo.password}'`;
};
const checkUserByUsernameQuery = (username) => {
  return `SELECT count(*) from public.user where username = '${username}'`;
};
module.exports.loginQuery = loginQuery;
module.exports.checkUserByUsernameQuery = checkUserByUsernameQuery;
