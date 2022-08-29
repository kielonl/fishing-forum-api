import { selectQuery, countReactionsQuery } from "./bestQueries";

function compare(a: { likes: number }, b: { likes: number }) {
  return a.likes - b.likes;
}

export const selectBest = async () => {
  const result: {
    post_id: string;
    title: string | null;
    content: string;
    author: string;
    image: string | null;
    likes: number;
  }[] = [];

  const res = await selectQuery();

  for (let index = 0, length = res.length; index < length; index++) {
    const likes = await countReactionsQuery(res[index].post_id);

    result.push({
      post_id: res[index].post_id,
      title: res[index].title,
      content: res[index].content,
      author: res[index].author,
      image: res[index].image,
      likes: likes[0]._sum.value === null ? 0 : likes[0]._sum.value,
    });
  }
  result.sort(compare);
  result.reverse();
  return result;
};
