import { PostInfo } from "../../types";


export const insertPostQuery = (postInfo:PostInfo) => {
  return `INSERT INTO public.post (title,content,author,image) VALUES ('${postInfo.title}','${postInfo.content}','${postInfo.author}','${postInfo.image}') RETURNING *`;
};

export const userExistsByUUID = (userUUID:string) => {
  return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
};

export const selectQuery = (table:string) => {
  return `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
};

export const didReactQuery = (post_id:string, user_id:string) => {
  return `SELECT value FROM public.reactions WHERE post_id = '${post_id}' AND user_id = '${user_id}'`;
};

export const countReactionsQuery = (post_id:string) => {
  return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
};


