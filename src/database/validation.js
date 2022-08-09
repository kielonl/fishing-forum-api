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

const passwordHashing = (password) => {
  if (!isLengthOK(3, 18, password))
    return { errorMessage: "password length too long or too short" };
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const yearsOfExperienceValidation = (yearsOfExperience) => {
  if (yearsOfExperience < 0 || yearsOfExperience > 120)
    throw new Error("it cannot be");
  return yearsOfExperience;
};

const biggestCatchValidadtion = (biggestCatch) => {
  if (biggestCatch < 0 || biggestCatch > 102)
    throw new Error("there is no dick");
  return biggestCatch;
};

const fishingCardValidation = (hasFishingCard) => {
  console.log(typeof hasFishingCard);
  if (typeof hasFishingCard !== "boolean")
    throw new Error("answer must be yes or no");
  return hasFishingCard;
};

const userInfoValidation = (userInfo) => {
  try {
    usernameValidation(userInfo.username);
    passwordHashing(userInfo.password);
    yearsOfExperienceValidation(userInfo.yearsOfExperience);
    biggestCatchValidadtion(userInfo.biggestCatch);
    fishingCardValidation(userInfo.hasFishingCard);
  } finally {
    const user = {
      username: usernameValidation(userInfo.username),
      password: passwordHashing(userInfo.password),
      yearsOfExperience: yearsOfExperienceValidation(
        userInfo.yearsOfExperience
      ),
      biggestCatch: biggestCatchValidadtion(userInfo.biggestCatch),
      hasFishingCard: fishingCardValidation(userInfo.hasFishingCard),
    };
    return user;
  }
};

module.exports.userInfoValidation = userInfoValidation;
