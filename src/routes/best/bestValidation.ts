import { dbQuery } from "../../database/database";
import { selectQuery, countReactionsQuery } from "./bestQueries";

function compare(a: { likes: number }, b: { likes: number }) {
  return a.likes - b.likes;
}

const selectBest = async () => {
  const result: {
    post_id: string;
    title: string;
    content: string;
    author: string;
    image: string;
    likes: number;
  }[] = [];
  const res = await dbQuery(selectQuery("public.post"));
  for (let index = 0; index < res.length; index++) {
    const likes = await dbQuery(countReactionsQuery(res[index].post_id));

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      image: res[index].image,
      likes: parseInt(likes[0]?.count),
    });
  }
  result.sort(compare);
  result.reverse();
  return result;
};

module.exports.selectBest = selectBest;
