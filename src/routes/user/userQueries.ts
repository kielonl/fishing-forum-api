import prisma from "../../prisma";
import { DetailsInfo, UserCredentials, UserInfo } from "../../types";

export const insertIntoUserQuery = async (userInfo: UserCredentials) => {
  // return `INSERT INTO public.user (username,password) VALUES('${userInfo.username}','${userInfo.password}') RETURNING *`;
  const query = await prisma.user.create({
    data: {
      username: userInfo.username,
      password: userInfo.password,
    },
  });
  console.log(query);
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
  console.log(query);
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
  console.log(query);
  return query;
};

export const selectQuery = async () => {
  //do poprawki
  // return `SELECT * FROM public.user ORDER BY created_at DESC LIMIT 10`;
  const query = await prisma.user.findMany({
    take: 10,
  });
  console.log(query);
  return query;
};

export const selectAllUsersQuery = async () => {
  //do poprawki
  // return `SELECT * FROM public.user ORDER BY created_at DESC LIMIT 10`;
  const query = await prisma.user.findMany();
  console.log(query);
  return query;
};

export const checkIfCountryExists = async (country: string) => {
  // return `SELECT exists(SELECT "NAME" FROM public.countries WHERE "${parameter1}" = '${parameter2}')`;
  const query = await prisma.countries.count({
    where: {
      NAME: country,
    },
  });
  console.log(query);
  return query;
};

export const getUserDetailsQuery = (username: string, password: string) => {
  return `SELECT public.user.username, public.details.country,public.details.city,public.details.years_of_experience,public.details.has_fishing_card,public.details.biggest_catch FROM public.user INNER JOIN public.details ON public.user.details_id = public.details.details_id WHERE (public.user.username = '${username}' AND public.user.password = '${password}')`;
};

export const selectUserByUUIDQuery = async (userUUID: string) => {
  // return `SELECT * from public.user where user_id = '${userUUID}'`;
  console.log(userUUID);
  const query = await prisma.user.findFirst({
    where: {
      user_id: userUUID,
    },
  });
  console.log(query);
  return query;
};

export const checkUserByUsernameQuery = async (username: string) => {
  // return `SELECT count(*) from public.user where username = '${username}'`;
  const query = await prisma.user.count({
    where: {
      username: username,
    },
  });
  console.log(query);
  return query;
};
