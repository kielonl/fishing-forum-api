const createError = require("http-errors");
const crypto = require("crypto");

const passwordHashing = (password) => {
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const isSizeOK = (minLength, maxLength, size) => {
  return size < minLength || size > maxLength;
};

const usernameValidation = (username) => {
  if (isSizeOK(3, 18, username.length))
    throw createError(
      400,
      "username length must be between 3 and 18 characters"
    );
  if (!isNaN(username)) throw createError(400, "username cannot me a number");
  return username.trim();
};

const passwordValidation = (password) => {
  if (isSizeOK(3, 18, password.length))
    throw createError(
      400,
      "password length must be between 3 and 18 characters"
    );
  password = passwordHashing(password);
  return password;
};

const userInfoValidation = (userInfo) => {
  const user = {
    username: userInfo.username,
    password: passwordHashing(userInfo.password),
    date: new Date().toLocaleString(),
  };
  return user;
};

module.exports.userInfoValidation = userInfoValidation;
module.exports.usernameValidation = usernameValidation;
module.exports.passwordValidation = passwordValidation;
