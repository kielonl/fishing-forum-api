const { dbQuery } = require("../../database/database");
const {
  userExistsByUUID,
  selectQuery,
  didReactQuery,
  countReactionsQuery,
} = require("./postQueries");

const isSizeOK = (minLength, maxLength, size) => {
  return size < minLength || size > maxLength;
};

// create Post

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isB64AnImage = (b64) => {
  const base64regex =
    /^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
  return base64regex.test(b64);
};

const titleValidation = (title) => {
  if (isSizeOK(5, 30, title.length)) {
    throw createError(400, "Title length must be between 5 and 30 characters");
  }
  return capitalizeFirstLetter(title);
};

const contentValidation = (content) => {
  if (isSizeOK(20, 300, content.length)) {
    throw createError(
      400,
      "Length of content must be between 20 and 300 characters"
    );
  }
  return content;
};

const authorValidation = async (author_id) => {
  const res = await dbQuery(userExistsByUUID(author_id));
  return author_id;
};

const imageValidation = (image = null) => {
  if (image === null) return image;
  if (!isB64AnImage(image)) throw createError(400, "image is invalid");
  return image;
};
const postValidation = async (postInfo) => {
  const post = {
    title: titleValidation(postInfo.title),
    content: contentValidation(postInfo.content),
    author: await authorValidation(postInfo.author),
    image: imageValidation(postInfo.image),
  };

  return { post };
};

// select Posts

const didClick = async (user_id, post_id) => {
  const result = await dbQuery(didReactQuery(user_id, post_id));
  if (result.length === 0) {
    return null;
  }
  return result[0].value;
};

const selectPosts = async (user_id) => {
  const result = [];
  const res = await dbQuery(selectQuery("public.post"));
  for (let index = 0; index < 10; index++) {
    const response = await didClick(res[index].post_id, user_id);
    const likes = await dbQuery(countReactionsQuery(res[index].post_id));

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      created_at: res[index].created_at,
      image: res[index].image,
      likes: parseInt(likes[0]?.count) | null,
      reacted: response !== null ? true : false,
      reactedValue: response,
    });
  }
  return result;
};

module.exports.postValidation = postValidation;
module.exports.selectPosts = selectPosts;
