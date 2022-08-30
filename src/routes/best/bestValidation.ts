import { Likes, Post } from "../../types";
import { selectQuery, countReactionsQuery } from "./bestQueries";

function compare(a: Likes, b: Likes) {
  return a.likes - b.likes;
}

export const selectBest = async () => {
  let result: Post[] = [];

  const res = await selectQuery();

  for (let index = 0, length = res.length; index < length; index++) {
    const likes = await countReactionsQuery(res[index].post_id);

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      image: res[index].image,
      likes: Number(likes[0]._sum.value),
    });
  }
  result.sort(compare);
  result.reverse();
  return result;
};
