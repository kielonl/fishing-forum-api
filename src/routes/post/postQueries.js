const insertPostQuery = (postInfo) => {
  return `INSERT INTO public.post (title,content,author,image) VALUES ('${postInfo.post.title}','${postInfo.post.content}','${postInfo.post.author}','${postInfo.post.image}') RETURNING *`;
};

const userExistsByUUID = (userUUID) => {
  return `SELECT COUNT(*) from public.user where user_id = '${userUUID}'`;
};

const selectQuery = (table) => {
  return `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 10`;
};

const didReactQuery = (post_id, user_id) => {
  return `SELECT value FROM public.reactions WHERE post_id = '${post_id}' AND user_id = '${user_id}'`;
};

const countReactionsQuery = (post_id) => {
  return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
};

module.exports.insertPostQuery = insertPostQuery;
module.exports.userExistsByUUID = userExistsByUUID;
module.exports.selectQuery = selectQuery;
module.exports.didReactQuery = didReactQuery;
module.exports.countReactionsQuery = countReactionsQuery;
