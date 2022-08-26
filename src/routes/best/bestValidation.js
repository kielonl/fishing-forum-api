const { selectQuery, countReactionsQuery } = require("./bestQueries");
const { dbQuery } = require("../../database/database");

const selectBest = async () => {
  const result = [];
  const res = await dbQuery(selectQuery("public.post"));
  console.log(res.length);
  for (let index = 0; index < res.length; index++) {
    const likes = await dbQuery(countReactionsQuery(res[index].post_id));

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      image: res[index].image,
      likes: parseInt(likes[0]?.count) | null,
    });
  }
  result.sort((a, b) =>
    a.likes > b.likes
      ? 1
      : a.likes === b.likes
      ? a.size > b.size
        ? 1
        : -1
      : -1
  );
  result.reverse();
  return result;
};

module.exports.selectBest = selectBest;
