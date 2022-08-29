import prisma from "../../prisma";
import { UserInfo } from "../../types";

export const loginQuery = async (userInfo: UserInfo) => {
  const query = await prisma.user.findFirst({
    where: {
      AND: {
        username: userInfo.username,
        password: userInfo.password,
      },
    },
    select: {
      username: true,
      user_id: true,
    },
  });
  return query;
};

export const checkUserByUsernameQuery = async (username: string) => {
  const query = await prisma.user.count({
    where: {
      username: username,
    },
  });
  return query;
};
