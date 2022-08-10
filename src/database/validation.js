const createError = require("http-errors");

require("dotenv").config();

const {
  selectQuery,
  selectQueryWithCondition,
} = require("../database/queries");

const { dbQuery } = require("../database/database");

const crypto = require("crypto");
const { create } = require("domain");

//used in this file only
const isLengthOK = (minLength, maxLength, string) => {
  if (string.length < minLength || string.length > maxLength) return false;
  return true;
};
const usernameValidation = (username) => {
  if (!isLengthOK(3, 18, username))
    throw createError(
      400,
      "username length must be between 3 and 18 characters"
    );
  if (!isNaN(username)) throw createError(400, "username cannot me a number");
  return username.trim();
};

const passwordHashing = (password) => {
  if (!isLengthOK(3, 18, password))
    return { errorMessage: "password length too long or too short" };
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const yearsOfExperienceValidation = (yearsOfExperience = null) => {
  if (yearsOfExperience !== null) {
    if (yearsOfExperience < 0 || yearsOfExperience > 120)
      throw createError(400, "maxmimum years of experience is 120");
  }
  return yearsOfExperience;
};

const biggestCatchValidadtion = (biggestCatch = null) => {
  if (biggestCatch !== null) {
    if (biggestCatch < 0 || biggestCatch > 1002)
      throw createError(400, "fish cannot be that big");
  }
  return biggestCatch;
};

const fishingCardValidation = (hasFishingCard = null) => {
  if (hasFishingCard !== null) {
    if (typeof hasFishingCard !== "boolean")
      throw createError(400, "answer must be yes or no");
  }
  return null;
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
  if (city.length < 0 || city.length > 30) {
    throw createError(400, "city name is too long");
  }
  return city;
};
const voivodeshipValidation = (voivodeship) => {
  if (voivodeship.length < 0 || voivodeship.length > 30) {
    throw createError(400, "voivodeship name is too long");
  }
  return voivodeship;
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
  const address = {
    country: await countryValidation(userInfo.country),
    city: cityNameValidation(userInfo.city),
    voivodeship: voivodeshipValidation(userInfo.voivodeship),
    yearsOfExperience: yearsOfExperienceValidation(userInfo.yearsOfExperience),
    biggestCatch: biggestCatchValidadtion(userInfo.biggestCatch),
    hasFishingCard: fishingCardValidation(userInfo.hasFishingCard),
    date: new Date().toLocaleString(),
  };
  return address;
};

module.exports.userInfoValidation = userInfoValidation;
module.exports.detailsValidation = detailsValidation;
