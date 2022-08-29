import { DetailsInfo, UserInfo } from "../../types";



export const insertIntoUserQuery = (userInfo:UserInfo) => {
  return `INSERT INTO public.user (username,password) VALUES('${userInfo.username}','${userInfo.password}') RETURNING *`;
};
export const insertIntoDetailsQuery = (userInfo:DetailsInfo) => {
  return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}') RETURNING *`;
};

export const appendUUIDToUser = (userUUID:string, detailsUUID:string) => {
  return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
};

export const selectQuery = (table:string) => {
  return `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
};

export const selectQueryWithCondition = (table:string, parameter1:string, parameter2:string) => {
  return `SELECT exists(SELECT "NAME" FROM ${table} WHERE "${parameter1}" = '${parameter2}')`;
};

export const getUserDetailsQuery = (username:string, password:string) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};

export const selectUserByUUIDQuery = (userUUID:string) => {
  return `SELECT * from public.user where user_id = '${userUUID}'`;
};

export const checkUserByUsernameQuery = (username:string) => {
  return `SELECT count(*) from public.user where username = '${username}'`;
};
