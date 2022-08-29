import { PostInfo } from "../../types";
import prisma from "../../prisma";

export const insertPostQuery = async (postInfo: PostInfo) => {
  // return `INSERT INTO public.post (title,content,author,image) VALUES ('${postInfo.title}','${postInfo.content}','${postInfo.author}','${postInfo.image}') RETURNING *`;
  const query = await prisma.post.create({
    data: {
      title: postInfo.title,
      content: postInfo.content,
      author: postInfo.author,
      image: postInfo.image,
    },
  });
  console.log(query);
  return query;
};

export const userExistsByUUID = async (userUUID: string) => {
  // return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
  const query = await prisma.user.count({
    where: {
      user_id: userUUID,
    },
  });
};

export const selectQuery = async () => {
  // return `SELECT * FROM public.post ORDER BY created_at DESC LIMIT 10`;
  const query = await prisma.post.findMany({
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });
  console.log(query);
  return query;
};

export const didReactQuery = async (post_id: string, user_id: string) => {
  //do poprawki
  // return `SELECT value FROM public.reactions WHERE post_id = '${post_id}' AND user_id = '${user_id}'`;
  const query = await prisma.reactions.findFirst({
    where: {
      AND: {
        post_id: post_id,
        user_id: user_id,
      },
    },
  });
  console.log(query);
  return query;
};

export const countReactionsQuery = async (post_id: string) => {
  return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
  // const query = await prisma.reactions.findFirst({
  //   where:{
  //     post_id:post_id
  //   },
  //   _sum:{
  //     value
  //   }
  // })
};
