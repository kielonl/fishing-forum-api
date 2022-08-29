import prisma from "../../prisma";

export const selectQuery = async () => {
  // return `SELECT * FROM public.post WHERE NOT image='null' AND NOT image='undefined' ORDER BY created_at DESC LIMIT 5`;
  const query = await prisma.post.findMany({
    take: 5,
    where: {
      NOT: {
        image: "undefined" || "null",
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return query;
};

export const countReactionsQuery = async (post_id: string) => {
  // return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
  const query = await prisma.reactions.groupBy({
    by: ["post_id"],
    _sum: {
      value: true,
    },
    where: {
      post_id: post_id,
    },
  });
  return query;
};
