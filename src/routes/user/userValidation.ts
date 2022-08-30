import createError from "http-errors";

require("dotenv").config();

import { checkIfCountryExists, checkUserByUsernameQuery } from "./userQueries";

import {
  usernameValidation,
  passwordValidation,
} from "../login/loginValidation";
import { DetailsInfo, UserCredentials } from "../../types.js";

const isSizeOK = (minLength: number, maxLength: number, size: number) => {
  return size < minLength || size > maxLength;
};

const yearsOfExperienceValidation = (yearsOfExperience: number): number => {
  if (isSizeOK(0, 120, yearsOfExperience))
    throw createError(400, "maximum years of experience is 120");
  return Number(yearsOfExperience);
};

const biggestCatchValidation = (biggestCatch: number): number => {
  if (isSizeOK(0, 1002, biggestCatch)) {
    throw createError(400, "fish weight must be between 0 kg and 1 ton");
  }
  return Number(biggestCatch);
};

const fishingCardValidation = (hasFishingCard: boolean) => {
  if (hasFishingCard !== null) {
    if (typeof hasFishingCard !== "boolean")
      throw createError(400, "answer must be yes or no");
  }
  return hasFishingCard;
};

const countryValidation = async (country: string) => {
  const res = await checkIfCountryExists(country);
  if (!res) {
    throw createError(400, "there is no such country");
  }
  return country;
};
const cityNameValidation = (city: string) => {
  if (city.trim().length <= 0 || city.trim().length >= 30) {
    throw createError(400, "city name must be between 0 and 30 characters");
  }
  return city;
};

export const userRegistration = async (userInfo: UserCredentials) => {
  let userExists = await checkUserByUsernameQuery(userInfo.username);

  if (userExists > 0) {
    throw createError(400, "username already exists");
  }
  const user = {
    username: usernameValidation(userInfo.username),
    password: passwordValidation(userInfo.password),
  };
  return user;
};

export const detailsValidation = async (userInfo: DetailsInfo) => {
  const details = {
    uuid: userInfo.uuid,
    country: await countryValidation(userInfo.country),
    city: cityNameValidation(userInfo.city),
    yearsOfExperience: yearsOfExperienceValidation(userInfo.yearsOfExperience),
    biggestCatch: biggestCatchValidation(userInfo.biggestCatch),
    hasFishingCard: fishingCardValidation(userInfo.hasFishingCard),
  };
  return details;
};
