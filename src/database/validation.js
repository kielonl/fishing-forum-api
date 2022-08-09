require("dotenv").config();

const selectUserByUUIDQuery = require("./queries");
const crypto = require("crypto");

//used in this file only
const isLengthOK = (minLength, maxLength, string) => {
  if (string.length < minLength || string.length > maxLength) return false;
  return true;
};
//exported
const usernameValidation = (username) => {
  if (!isLengthOK(3, 18, username))
    throw new Error("username length must be between 3 and 18 characters");
  if (!isNaN(username)) throw new Error("username cannot me a number");
  return username.trim();
};

const checkForUUID = (uuid) => {
  return selectUserByUUIDQuery(uuid);
};

const passwordValidation = (password) => {
  if (!isLengthOK(3, 18, password))
    return { errorMessage: "password length too long or too short" };
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const yearsOfExperienceValidation = (yearsOfExperience) => {
  if (yearsOfExperience < 0 || yearsOfExperience > 120)
    throw new Error("nie da sie tak");
};

module.exports.usernameValidation = usernameValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.checkForUUID = checkForUUID;
