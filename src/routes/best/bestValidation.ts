import { Best, Post } from "../../types";
import { selectQuery, countReactionsQuery } from "./bestQueries";

function compare(a: Best, b: Best) {
  return a.likes - b.likes;
}

export const selectBest = async () => {
  let result: Best[] = [];

  const res = await selectQuery();

  for (let index = 0, length = res.length; index < length; index++) {
    const likes = await countReactionsQuery(res[index].post_id);

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      created_at: res[index].created_at,
      author: res[index].author,
      image: res[index].image,
      likes: Number(likes[0]._sum.value),
    });
  }
  result.sort(compare);
  result.reverse();
  return result;
};
