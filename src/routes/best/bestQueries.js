const selectQuery = (table) => {
  return `SELECT * FROM ${table} WHERE NOT image='null' AND NOT image='undefined' ORDER BY created_at DESC LIMIT 5`;
};

const countReactionsQuery = (post_id) => {
  return `SELECT SUM(value) as count FROM public.reactions WHERE post_id = '${post_id}'`;
};

module.exports.selectQuery = selectQuery;
module.exports.countReactionsQuery = countReactionsQuery;
