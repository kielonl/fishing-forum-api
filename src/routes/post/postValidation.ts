import createError from "http-errors";

import { PostInfo } from "../../types";
import {
  userExistsByUUID,
  selectQuery,
  didReactQuery,
  countReactionsQuery,
} from "./postQueries";

const isSizeOK = (minLength: number, maxLength: number, size: number) => {
  return size < minLength || size > maxLength;
};

// create Post

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isB64AnImage = (b64: string) => {
  const base64regex =
    /^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
  return base64regex.test(b64);
};

const titleValidation = (title: string) => {
  if (isSizeOK(5, 30, title.length)) {
    throw createError(400, "Title length must be between 5 and 30 characters");
  }
  return capitalizeFirstLetter(title);
};

const contentValidation = (content: string) => {
  if (isSizeOK(20, 300, content.length)) {
    throw createError(
      400,
      "Length of content must be between 20 and 300 characters"
    );
  }
  return content;
};

const authorValidation = async (author_id: string) => {
  const res = await userExistsByUUID(author_id);
  return author_id;
};

const imageValidation = (image: string | null = null) => {
  if (image === null) return image;
  if (!isB64AnImage(image)) throw createError(400, "image is invalid");
  return image;
};
export const postValidation = async (postInfo: PostInfo) => {
  const post = {
    title: titleValidation(postInfo.title),
    content: contentValidation(postInfo.content),
    author: await authorValidation(postInfo.author),
    image: imageValidation(postInfo.image),
  };

  return post;
};

// select Posts

const didClick = async (user_id: string, post_id: string) => {
  const result = await didReactQuery(user_id, post_id);
  if (!result) {
    return null;
  }
  return result.value;
};

export const selectPosts = async (user_id: string) => {
  const result: {
    post_id: string;
    title: string | null;
    content: string;
    author: string;
    created_at: Date | null;
    image: string | null;
    likes: number;
    reacted: boolean;
    reactedValue: number | null;
  }[] = [];
  const res = await selectQuery();
  for (let index = 0; index < 10; index++) {
    const response = await didClick(res[index].post_id, user_id);
    const likes = await countReactionsQuery(res[index].post_id);

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      created_at: res[index].created_at,
      image: res[index].image,
      likes: likes[0]?._sum.value === null ? 0 : likes[0]?._sum.value,
      reacted: response !== null ? true : false,
      reactedValue: response,
    });
  }
  return result;
};
