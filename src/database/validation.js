const createError = require("http-errors");

require("dotenv").config();

const {
  selectQueryWithCondition,
  getUserByUUID,
} = require("../database/queries");

const { dbQuery } = require("../database/database");

const crypto = require("crypto");
const { create } = require("domain");

//used in this file only
const isSizeOK = (minLength, maxLength, size) => {
  return size < minLength || size > maxLength;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const usernameValidation = (username) => {
  if (isSizeOK(3, 18, username.length))
    throw createError(
      400,
      "username length must be between 3 and 18 characters"
    );
  if (!isNaN(username)) throw createError(400, "username cannot me a number");
  return username.trim();
};

const passwordHashing = (password) => {
  if (isSizeOK(3, 18, password.length))
    return { errorMessage: "password length too long or too short" };
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const yearsOfExperienceValidation = (yearsOfExperience = null) => {
  if (yearsOfExperience !== null) {
    if (isSizeOK(0, 120, yearsOfExperience))
      throw createError(400, "maximum years of experience is 120");
  }
  return yearsOfExperience;
};

const biggestCatchValidadtion = (biggestCatch = null) => {
  if (biggestCatch !== null) {
    if (isSizeOK(0, 1002, biggestCatch))
      throw createError(400, "fish weight must be between 0 kg and 1 ton");
  }
  return biggestCatch;
};

const fishingCardValidation = (hasFishingCard) => {
  if (hasFishingCard !== null) {
    if (typeof hasFishingCard !== "boolean")
      throw createError(400, "answer must be yes or no");
  }
  return hasFishingCard;
};

const countryValidation = async (country) => {
  const res = await dbQuery(
    selectQueryWithCondition("countries", "NAME", country)
  );
  if (!res) {
    throw createError(400, "there is no such country");
  }
  return country;
};
const cityNameValidation = (city) => {
  if (city.trim().length <= 0 || city.trim().length >= 30) {
    throw createError(400, "city name must be between 0 and 30 characters");
  }
  return city;
};

//posts
const titleValidation = (title) => {
  console.log("------------------");
  console.log(title.length);
  console.log("------------------");

  if (isSizeOK(5, 300, title.length)) {
    throw createError(400, "Title length must be between 5 and 30 characters");
  }
  return capitalizeFirstLetter(title);
};

const contentValidation = (content) => {
  if (!isSizeOK(20, 300, content.length)) {
    throw createError(
      400,
      "Length of content must be between 20 and 300 characters"
    );
  }
  return content;
};

const authorValidation = async (author_id) => {
  // const res = await dbQuery(getUserByUUID(author_id));
  // if (!res) {
  //   throw createError(400, "there is no user with such UUID");
  // }
  const res = await dbQuery(getUserByUUID(author_id));
  console.log(!res[0]);
  console.log(author_id);
  return author_id;
};

//user table
const userInfoValidation = (userInfo) => {
  const user = {
    username: usernameValidation(userInfo.username),
    password: passwordHashing(userInfo.password),
    date: new Date().toLocaleString(),
  };
  return user;
};

//address table
const detailsValidation = async (userInfo) => {
  console.log(userInfo.hasFishingCard);
  const details = {
    uuid: userInfo.uuid,
    country: await countryValidation(userInfo.country),
    city: cityNameValidation(userInfo.city),
    yearsOfExperience: yearsOfExperienceValidation(userInfo.yearsOfExperience),
    biggestCatch: biggestCatchValidadtion(userInfo.biggestCatch),
    hasFishingCard: fishingCardValidation(userInfo.hasFishingCard),
    date: new Date().toLocaleString(),
  };
  return details;
};

//post table

const postValidation = async (postInfo) => {
  const post = {
    title: titleValidation(postInfo.title),
    content: contentValidation(postInfo.content),
    author: await authorValidation(postInfo.author),
  };
  return post;
};

module.exports.userInfoValidation = userInfoValidation;
module.exports.detailsValidation = detailsValidation;
module.exports.postValidation = postValidation;
module.exports.passwordHashing = passwordHashing;
