import createError from "http-errors";
import crypto from "crypto";
import { UserInfo } from "../../types";



const passwordHashing = (password:string) => {
  //@ts-ignore
  const hasher = crypto.createHmac("sha256", process.env.HASH_KEY);
  password = hasher.update(password).digest("hex");
  return password;
};

const isSizeOK = (minLength:number, maxLength:number, size:number) => {
  return size < minLength || size > maxLength;
};

export const usernameValidation = (username:string) => {
  if (isSizeOK(3, 18, username.length))
    throw createError(
      400,
      "username length must be between 3 and 18 characters"
    );
  return username.trim();
};

export const passwordValidation = (password:string) => {
  if (isSizeOK(3, 18, password.length))
    throw createError(
      400,
      "password length must be between 3 and 18 characters"
    );
  password = passwordHashing(password);
  return password;
};


export const userInfoValidation = (userInfo:UserInfo) => {
  const user = {
    username: userInfo.username,
    password: passwordHashing(userInfo.password),
    date: new Date().toLocaleString(),
  };
  return user;
};

