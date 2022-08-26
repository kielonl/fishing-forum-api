const loginQuery = (userInfo) => {
  return `SELECT username,user_id FROM public.user WHERE username='${userInfo.username}' AND password = '${userInfo.password}'`;
};

module.exports.loginQuery = loginQuery;
