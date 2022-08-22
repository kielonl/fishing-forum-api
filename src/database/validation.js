const createError = require("http-errors");

require("dotenv").config();

const {
  selectQueryWithCondition,
  getUserByUUID,
  checkUserQuery,
  getCountQuery,
  getPostByUUID,
  getReactionByPostUUID,
  updateReactionCount,
} = require("../database/queries");

const { dbQuery } = require("../database/database");

const crypto = require("crypto");

//used in this file only
const isSizeOK = (minLength, maxLength, size) => {
  return size < minLength || size > maxLength;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

const passwordHashing = (password) => {
  if (isSizeOK(3, 18, password.length))
    return { errorMessage: "password length too long or too short" };
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const isB64AnImage = (b64) => {
  const base64regex =
    /^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
  return base64regex.test(b64);
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
  if (isSizeOK(5, 30, title.length)) {
    throw createError(400, "Title length must be between 5 and 30 characters");
  }
  return capitalizeFirstLetter(title);
};

const contentValidation = (content) => {
  if (isSizeOK(20, 300, content.length)) {
    throw createError(
      400,
      "Length of content must be between 20 and 300 characters"
    );
  }
  return content;
};

const checkUser = async (author_id) => {
  const res = await dbQuery(checkUserQuery(author_id));
  if (!parseInt(res[0].count)) throw createError(400, "there is no such user");
  return author_id;
};

const checkPost = async (post_id) => {
  const res = await dbQuery(getPostByUUID(post_id));
  console.log("asdfasdf");
  console.log(parseInt(res[0].count));
  if (!parseInt(res[0].count)) throw createError(400, "there is no such post");
  return post_id;
};

const getCount = async (post_id, type = increase) => {
  const count = await dbQuery(getCountQuery(post_id));

  console.log(count.length);
  if (count.length === 0) {
    return 1;
  }
  if (type === "increase") {
    return parseInt((count[0].count += 1));
  }
  if (type === "decrease") {
    return parseInt((count[0].count -= 1));
  }
  throw createError(400, "unknown error");
};

const imageValidation = (image = null) => {
  if (image === null) return image;
  if (!isB64AnImage(image)) throw createError(400, "image is invalid");
  return image;
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
    author: await checkUser(postInfo.author),
    image: imageValidation(postInfo.image),
  };
  return post;
};

//reactions table

const reactionValidation = async (reactionInfo) => {
  const test = await dbQuery(getReactionByPostUUID(reactionInfo.post_id));
  console.log(test);
  if (test[0].length !== 0) {
    const res = await dbQuery(
      updateReactionCount(test[0].reaction_id, parseInt(test[0].count) + 1)
    );
    return;
  }
  const reaction = {
    user_id: await checkUser(reactionInfo.user_id),
    post_id: await checkPost(reactionInfo.post_id),
    count: await getCount(reactionInfo.post_id, "increase"),
  };
  return reaction;
};

module.exports.userInfoValidation = userInfoValidation;
module.exports.detailsValidation = detailsValidation;
module.exports.postValidation = postValidation;
module.exports.reactionValidation = reactionValidation;
module.exports.passwordHashing = passwordHashing;
