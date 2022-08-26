const { selectQuery, countReactionsQuery } = require("./bestQueries");
const { dbQuery } = require("../../database/database");

function compare(a, b) {
  return a.likes - b.likes;
}

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
  result.sort(compare);
  result.reverse();
  return result;
};

module.exports.selectBest = selectBest;
