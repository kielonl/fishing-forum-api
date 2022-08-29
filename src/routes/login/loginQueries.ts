import prisma from '../../prisma'
import { UserInfo } from '../../types';


export const loginQuery = async(userInfo:UserInfo) => {
  // return `SELECT username,user_id FROM public.user WHERE username='${userInfo.username}' AND password = '${userInfo.password}'`;
  const query = await prisma.user.findFirst({
    where: {
      username:userInfo.username,
      password:userInfo.password
    },
  })
  return query
};
export const checkUserByUsernameQuery = (username:string) => {
  return `SELECT count(*) from public.user where username = '${username}'`;
};
