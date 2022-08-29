export const selectQuery = (table:string) => {
  return `SELECT * FROM ${table} WHERE NOT image='null' AND NOT image='undefined' ORDER BY created_at DESC LIMIT 5`;
};

export const countReactionsQuery = (post_id:string) => {
  return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
};


