import prisma from "../../prisma";
import { DetailsInfo, UserCredentials } from "../../types";

export const insertIntoUserQuery = async (userInfo: UserCredentials) => {
  // return `INSERT INTO public.user (username,password) VALUES('${userInfo.username}','${userInfo.password}') RETURNING *`;
  const query = await prisma.user.create({
    data: {
      username: userInfo.username,
      password: userInfo.password,
    },
  });
  return query;
};
export const insertIntoDetailsQuery = async (userInfo: DetailsInfo) => {
  // return `INSERT INTO public.details (country,city,has_fishing_card,years_of_experience,biggest_catch) VALUES('${userInfo.country}','${userInfo.city}','${userInfo.hasFishingCard}','${userInfo.yearsOfExperience}','${userInfo.biggestCatch}') RETURNING *`;
  const query = await prisma.details.create({
    data: {
      country: userInfo.country,
      city: userInfo.city,
      has_fishing_card: userInfo.hasFishingCard,
      years_of_experience: userInfo.yearsOfExperience,
      biggest_catch: userInfo.biggestCatch,
    },
  });
  return query;
};

export const appendUUIDToUser = async (
  userUUID: string,
  detailsUUID: string
) => {
  // return `UPDATE public.user set details_id = '${detailsUUID}' where user_id = '${userUUID}'RETURNING *`;
  const query = await prisma.user.update({
    where: {
      user_id: userUUID,
    },
    data: {
      details_id: detailsUUID,
    },
  });
  return query;
};

export const selectQuery = async () => {
  //do poprawki
  // return `SELECT * FROM public.user ORDER BY created_at DESC LIMIT 10`;
  const query = await prisma.user.findMany({
    take: 10,
  });
  return query;
};

export const selectAllUsersQuery = async () => {
  // return `SELECT * FROM public.user ORDER BY created_at DESC LIMIT 10`;
  const query = await prisma.user.findMany();
  return query;
};

export const checkIfCountryExists = async (country: string) => {
  // return `SELECT exists(SELECT "NAME" FROM public.countries WHERE "${parameter1}" = '${parameter2}')`;
  const query = await prisma.countries.count({
    where: {
      NAME: country,
    },
  });
  return query;
};

export const selectUserByUUIDQuery = async (userUUID: string) => {
  // return `SELECT * from public.user where user_id = '${userUUID}'`;
  const query = await prisma.user.findFirst({
    where: {
      user_id: userUUID,
    },
  });
  return query;
};

export const checkUserByUsernameQuery = async (username: string) => {
  // return `SELECT count(*) from public.user where username = '${username}'`;
  const query = await prisma.user.count({
    where: {
      username: username,
    },
  });
  return query;
};
